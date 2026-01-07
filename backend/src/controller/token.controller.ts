import type { Request, Response } from "express";
import userModel from "../models/user.model.ts";
import poolModel from "../models/pool.model.ts";
import mongoose from "mongoose";
import { deleteImage, uploadImage } from "../config/imagekit.config.ts";
import { client } from "../db/redis.ts";

export async function createPool(req: Request, res: Response) {
  const { token, tokenAmount, tokenPrice } = req.body;

  try {
    const isPool = await poolModel.findOne({ token });
    if (isPool) {
      return res.status(409).json({ message: "Pool is already created" });
    }
    const y_amount: number = tokenAmount * tokenPrice;

    const CONSTANT: number = Math.ceil(tokenAmount * y_amount);

    if(!req.file || !req.file.buffer){
      return res.status(500).json({message: "Token picture is not given"})
    }
    const tokenImg = await uploadImage(req.file?.buffer)

    const liquidityPool = await poolModel.create({
      token,
      tokenImg: tokenImg?.url || "",
      picId: tokenImg?.fileId || "",
      tokenAmount,
      amount: y_amount,
      constant: CONSTANT,
    });
    res
      .status(201)
      .json({ message: "pool created sucessfully", pool: liquidityPool });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function deletePool(req: Request, res: Response) {
  const { pool } = req.params;

  try {
    const query = mongoose.Types.ObjectId.isValid(pool as string)
      ? { $or: [{ _id: pool }, { token: pool }] }
      : { token: pool };
    const Lpool = await poolModel.findOne(query)
    if(!Lpool) return res.status(404).json({message: "Liquidity pool is not found"})
    await deleteImage(Lpool.picId)
    await poolModel.findOneAndDelete({_id: Lpool._id})
    res.status(200).json({message: "Liquidity pool is deleted sucessfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal server error"})
  }

}

export async function buyToken(req: Request, res: Response) {
  const { id, qty = 1 } = req.query;

  try {
    const session = await mongoose.startSession();

    // Fetch user and pool from their collections
    const [user, pool] = await Promise.all([
      userModel.findOne({ _id: req.user._id }),
      poolModel.findOne({ _id: id }),
    ]);

    if (!user || !pool) {
      return res.status(404).json({ message: "Not Found" });
    }

    let NEW_POOL_TOKEN:number = pool.tokenAmount;
    let NEW_AMOUNT : number = 0;
    let amount : number = 0;

    for(let i=1;i<=Number(qty);i++){

      NEW_POOL_TOKEN = NEW_POOL_TOKEN - 1;
      NEW_AMOUNT = Math.ceil(pool.constant / NEW_POOL_TOKEN);
      amount += Math.ceil(NEW_AMOUNT / NEW_POOL_TOKEN)

    }

    // const NEW_POOL_TOKEN = pool.tokenAmount - Number(qty);
    // const NEW_AMOUNT = Math.ceil(pool.constant / NEW_POOL_TOKEN);
    // const amount = Math.ceil(NEW_AMOUNT / NEW_POOL_TOKEN) * Number(qty);

    // console.log(`NEW_POOL_TOKEN = ${NEW_POOL_TOKEN} \n NEW_AMOUNT=${NEW_AMOUNT} \n amount=${amount}`)

    if (user.money < amount) {
      return res.status(422).json({ message: "Insufficient balance !" });
    }


    // start tranction
    session.startTransaction();

    await Promise.all([
      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          $inc: { money: -amount, [`tokens.${pool.token}`]: qty },
        },
        { session, new: true }
      ),

      await poolModel.findOneAndUpdate(
        { _id: id },
        {
          tokenAmount: NEW_POOL_TOKEN,
          amount: NEW_AMOUNT,
        },
        { session }
      ),
    ]);

    await session.commitTransaction();
    // end transaction

    res.status(200).json({ message: `You buy ${qty} tokens for ${amount}` });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sellToken(req: Request, res: Response) {
  const { id, qty = 1 } = req.query;

  try {
    const [user, pool] = await Promise.all([
      userModel.findOne({ _id: req.user._id }),
      poolModel.findOne({ _id: id }),
    ]);

    if (!user || !pool) {
      return res.status(404).json({ message: "Not found" });
    }

    if ( (user.tokens?.get(pool.token) || 0) < Number(qty) ) {
      return res.status(422).json({ message: "Insufficient tokens!" });
    }

    // creating session for transaction
    const session = await mongoose.startSession();

    session.startTransaction();

    let perTokenNewAmount : number = 0;
    let amount: number = 0;

    for(let i=0;i<Number(qty);i++){

      perTokenNewAmount = (pool.constant / (pool.tokenAmount + i) ) / ( pool.tokenAmount + i)
      amount += Math.ceil(perTokenNewAmount)

    }

    const Y_amount: number = pool.constant / (pool.tokenAmount + Number(qty));

    // const perTokenNewAmount: number = Math.ceil(( pool.constant / pool.tokenAmount ) / pool.tokenAmount );
    
    // const amount: number = perTokenNewAmount * Number(qty);


    
      await  poolModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: { tokenAmount: Number(qty) },
          amount: Y_amount,
        },
        { session, new:true }
      )

      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          $inc: {
            [`tokens.${pool.token}`]: -Number(qty),
            money: amount,
          },
        },
        { session }
      )

    await session.commitTransaction();

    res
      .status(200)
      .json({
        message: `You sell ${qty} tokens for rupees ${amount}`,
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getTokenPrice(req: Request, res: Response) {
  const { id } = req.params;

  try{

    const pool = await poolModel.findOne({ $or: [{name: id}, {_id: id}] })

    if (!pool) return res.status(404).json({message: "Not found"})

    const min_token = pool.tokenAmount - 1;
    
    const buyPrice = Math.ceil( (pool.constant / min_token) / min_token )

    const sellPrice = Math.ceil(pool.amount / pool.tokenAmount)

    res.status(200).json({name: pool.token, buy_price: buyPrice, sell_price: sellPrice})

  } catch (err) {
    res.status(500).json({message: "Internal server error"})
  }
}

export async function getAirDrop(req: Request, res: Response) {
  try {

    const alreadyGet = await client.get(req.user._id)
    if(alreadyGet) return res.status(401).json({message: "You can't access 2 airdrop in a day, Try after 24 hours"})

    await client.set(req.user._id, 1, {
      EX:86400
    })

    await userModel.findOneAndUpdate({_id: req.user._id}, {
      $inc: {
        money: 100
      }
    })

    res.status(200).json({message: "Airdrop get sucessfully", amount: 100})
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
  }
}
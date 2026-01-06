import type { Request, Response } from "express";
import userModel from "../models/user.model.ts";
import poolModel from "../models/pool.model.ts";
import mongoose from "mongoose";

export async function createPool(req: Request, res: Response) {
  const { token, tokenImg, tokenAmount, tokenPrice } = req.body;
  console.log(req.file)

  try {
    const isPool = await poolModel.findOne({ token });
    if (isPool) {
      return res.status(409).json({ message: "Pool is already created" });
    }
    const y_amount: number = tokenAmount * tokenPrice;

    const CONSTANT: number = Math.ceil(tokenAmount * y_amount);

    const liquidityPool = await poolModel.create({
      token,
      tokenImg,
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
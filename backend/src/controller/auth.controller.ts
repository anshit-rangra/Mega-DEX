import {type Request, type Response} from 'express'
import userModel from '../models/user.model.ts'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export async function registerUser (req: Request, res: Response) {
    let {username, profile, password} = req.body;
    username = username.trim(); password = password.trim();

    try {
        const userExists = await userModel.findOne({username})
        
        if(userExists) return res.status(409).json({message: "User is already exists"})

        const userCreated = await userModel.create({username, profile, password})

        const JWT_SECRET: string = process.env.JWT_SECRET || ""
        const token = jwt.sign({_id: userCreated._id, username: userCreated.username}, JWT_SECRET)


        res.cookie("authToken", token, {httpOnly: false, sameSite:"lax", secure: true})
        res.status(201).json({message: "User is created sucessfully", token})

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }

}

export async function loginUser (req: Request, res: Response) {
    const cred = req.body;
    const username: string = cred.username.trim() || ""
    const password: string = cred.password.trim() || ""

    try {
        const userExists = await userModel.findOne({username}).select("+password")
        if(!userExists) return res.status(404).json({message: "User doesn't exists"})

        const comparePassword = await bcrypt.compare(password, userExists.password)
        if(!comparePassword) return res.status(400).json({message: "Invalid credential"})
        
        const JWT_SECRET : string = process.env.JWT_SECRET || ""
        const token = jwt.sign({_id: userExists._id, username: userExists.username}, JWT_SECRET)

        res.cookie("authToken", token, {httpOnly: false,sameSite: "lax", secure: true})
        res.status(200).json({message: "User loggedIn sucessfully", token})

    } catch (error){
        res.status(500).json({message: "Internal server error"})
    }
}

export async function myProfile(req: Request, res: Response) {
     try {

        const user = await userModel.findOne({_id: req.user._id})

        res.status(200).json({ user })
        
     } catch (error) {
        res.status(500).json({message: "Internal server error"})
     }
}

export async function userProfile(req: Request, res: Response) {
    const { id  } = req.params;

    try {
        const user = await userModel.findOne({username: id})

        if(!user) return res.status(404).json({message: "User not found"})

        return res.status(200).json({user, message: "User fetch sucessfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}
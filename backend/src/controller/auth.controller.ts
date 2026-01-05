import {type Request, type Response} from 'express'
import userModel from '../models/user.model.ts'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export function home(req: Request, res: Response) {
    res.send("Hello world")
}

export async function registerUser (req: Request, res: Response) {
    let {username, password} = req.body;
    username = username.trim(); password = password.trim();

    try {
        const userExists = await userModel.findOne({username})
        
        if(userExists) return res.status(409).json({message: "User is already exists"})

        const userCreated = await userModel.create({username, password})

        const JWT_SECRET: string = process.env.JWT_SECRET || ""
        const token = jwt.sign({_id: userCreated._id, username: userCreated.username}, JWT_SECRET)


        res.cookie("authToken", token)
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

        res.cookie("authToken", token)
        res.status(200).json({message: "User loggedIn sucessfully", token})

    } catch (error){
        res.status(500).json({message: "Internal server error"})
    }
}
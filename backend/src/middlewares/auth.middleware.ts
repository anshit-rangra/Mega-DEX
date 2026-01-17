import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
    const token : string = req.cookies?.authToken || req.headers?.authorization?.split(" ")[1] || ""

    
    try {
    const JWT_SECRET = process.env.JWT_SECRET || ""
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;
    next()
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}
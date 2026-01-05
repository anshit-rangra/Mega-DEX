import {z} from 'zod'
import {type Request, type Response, type NextFunction} from 'express'

const userValidator = z.object({
    username: z.string().trim().min(6, "Username must be at least 6 character long"),
    password: z.string().trim().min(6, "Password must be at least 6 character long")
})

function validator(req: Request, res: Response, next: NextFunction) {
    try {
        
    const validate = userValidator.parse(req.body)
        next()
    } catch (error: any) {
        const err = JSON.parse(error?.message)
        res.json({message: err[0].message})
    }
}

export default validator;
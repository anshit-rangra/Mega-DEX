import express from 'express'
import { home, loginUser, registerUser } from "../controller/auth.controller.ts";
import userValidator from '../validation/user.validator.ts'
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router: express.Router = express.Router();

router.get("/", authMiddleware, home)

router.post('/register', userValidator, registerUser)

router.post("/login", loginUser)

export default router;
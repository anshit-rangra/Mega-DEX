import express from 'express'
import { loginUser, myProfile, registerUser, userProfile } from "../controller/auth.controller.ts";
import userValidator from '../validation/user.validator.ts'
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router: express.Router = express.Router();

router.get("/me", authMiddleware, myProfile)

router.post('/register', userValidator, registerUser)

router.post("/login", loginUser)

router.get("/user/:id", userProfile)

export default router;
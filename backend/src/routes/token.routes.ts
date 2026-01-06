import express from 'express';
import { buyToken, createPool, getTokenPrice, sellToken } from '../controller/token.controller.ts';
import { upload } from '../config/multer.config.ts';

const router = express.Router()


router.post('/create/pool' ,upload.single("tokenPic"), createPool)

router.post("/buy", buyToken)

router.post("/sell", sellToken)

router.get("/get/price/:id", getTokenPrice)

export default router;
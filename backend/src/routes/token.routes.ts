import express from 'express';
import { buyToken, createPool, deletePool, getTokenPrice, sellToken, getAirDrop } from '../controller/token.controller.ts';
import { upload } from '../config/multer.config.ts';

const router = express.Router()


router.post('/create/pool' ,upload.single("tokenPic"), createPool)
router.delete('/delete/pool/:pool', deletePool)

router.get("/drop", getAirDrop)

router.post("/buy", buyToken)

router.post("/sell", sellToken)

router.get("/get/price/:id", getTokenPrice)

export default router;
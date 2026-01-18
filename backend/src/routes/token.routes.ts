import express from 'express';
import { buyToken, createPool, deletePool, getTokenPrice, sellToken, getAirDrop, getAllPool } from '../controller/token.controller.ts';
import { upload } from '../config/multer.config.ts';
import { authMiddleware } from '../middlewares/auth.middleware.ts';

const router = express.Router()


router.post('/create/pool', authMiddleware ,upload.single("tokenPic"), createPool)
router.delete('/delete/pool/:pool', authMiddleware, deletePool)
router.get("/fetch/pools", getAllPool)

router.get("/drop",authMiddleware, getAirDrop)

router.post("/buy",authMiddleware, buyToken)

router.post("/sell",authMiddleware, sellToken)

router.get("/get/price/:id", getTokenPrice)

export default router;
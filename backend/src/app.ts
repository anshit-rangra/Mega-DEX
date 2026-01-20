import express from 'express'
import AuthRoutes from './routes/auth.routes.ts' 
import cookieParser from 'cookie-parser';
import TokenRoutes from './routes/token.routes.ts'
import cors from 'cors'
import {config} from "dotenv"

config()

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", AuthRoutes)

app.use("/api/token", TokenRoutes)

export default app;
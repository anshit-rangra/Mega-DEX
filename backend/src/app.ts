import express from 'express'
import AuthRoutes from './routes/auth.routes.ts' 
import cookieParser from 'cookie-parser';
import TokenRoutes from './routes/token.routes.ts'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", AuthRoutes)

app.use("/api/token", TokenRoutes)

export default app;
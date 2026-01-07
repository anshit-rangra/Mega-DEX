import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.ts';
import connectDB from "./src/db/db.ts";
import { RedisConnection } from './src/db/redis.ts';

const PORT: string = process.env.PORT || "";


RedisConnection();
connectDB().then(() => {
  
  app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
  });
}).catch((err) => {
  console.log("Error coming via database")
})
import redis from "redis";
import { config } from "dotenv";
config();

const redisURL: string = process.env.REDIS_URL || "";
export const client = redis.createClient({ url: redisURL });

export async function RedisConnection() {

  client.on("error", (err) => console.log("Redis Client Error"));
  client.on("connect", () => console.log("Redis Client Connected"));

  await client.connect();

}


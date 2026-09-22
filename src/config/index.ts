import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number(process.env.PORT),
    MONGODB_URI: z.coerce.string(process.env.MONGODB_URI),
    REDIS_HOST: z.coerce.string(process.env.REDIS_HOST),
    REDIS_PORT: z.coerce.number(process.env.REDIS_PORT),
    JWT_SECRET: z.coerce.string(process.env.JWT_SECRET)
});

export const env = envSchema.parse(process.env);
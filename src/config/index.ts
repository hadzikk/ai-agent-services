import "dotenv/config";

export const env = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT
}
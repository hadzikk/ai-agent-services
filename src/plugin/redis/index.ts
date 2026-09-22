import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createClient } from "redis";
import { env } from "../../config/index.ts";

const redis = async (fastify: FastifyInstance) => {
    const client = createClient({
        socket: {
            host: env.REDIS_HOST,
            port: parseInt(env.REDIS_PORT)
        }
    });

    client.on("connect", () => { fastify.log.info("Redis connecting") });
    client.on("ready", () => { fastify.log.info("Redis connected") });
    client.on("reconnecting", () => { fastify.log.warn("Redis reconnect") });
    client.on("error", (error) => { fastify.log.error(error, "Redis error") });

    await client.connect();

    fastify.decorate("redis", client);

    fastify.addHook("onClose", async () => {
        await client.quit();
    });
}

export default fp(redis);
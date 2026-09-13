import { FastifyPluginAsync } from "fastify";
import redisRoutes from "../../module/redis/redis.route.ts";
import llmRoutes from "../../module/llm/llm.route.ts";

const routes: FastifyPluginAsync = async (fastify) => {
    await fastify.register(redisRoutes, { prefix: "/redis" });
    await fastify.register(llmRoutes, { prefix: "/llm" });
}

export default routes;
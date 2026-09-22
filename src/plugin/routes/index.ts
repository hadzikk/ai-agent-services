import { FastifyPluginAsync } from "fastify";
import agentRoutes from "../../module/agent/agent.route.ts";
import userRoutes from "../../module/user/user.route.ts";

const routes: FastifyPluginAsync = async (fastify) => {
    await fastify.register(userRoutes, { prefix: "/api/users" });
    await fastify.register(agentRoutes, { prefix: "/api/agents" });
}

export default routes;
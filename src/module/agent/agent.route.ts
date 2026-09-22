import { FastifyPluginAsync } from "fastify";
import * as controllers from "./agent.controller.ts";

const agentRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/chat", controllers.chat);
}

export default agentRoutes;
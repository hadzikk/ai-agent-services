import { FastifyPluginAsync } from "fastify";
import * as controllers from "./llm.controller.ts";

const llmRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/chat", controllers.chat);
}

export default llmRoutes;
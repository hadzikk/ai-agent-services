import { tool } from "langchain";
import { z } from "zod";
import type { FastifyInstance } from "fastify";

export function retrieveKnowledgeFromPDFTool(fastify: FastifyInstance) {
    return tool(
    )
}
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createAgent } from "langchain";
import model from "./model.ts";
import { searchBookTool } from "../../shared/helpers/tools/mongodb.tool";

const agent = async (fastify: FastifyInstance) => {
    const create = createAgent({
        model,
        tools: [
            searchBookTool(fastify.mongodb.db("books_recommendation_system"))
        ],
        systemPrompt: "You are helpful assistant that help users with book information."
    }); 

    fastify.decorate("agent", create);
}

export default fp(agent);
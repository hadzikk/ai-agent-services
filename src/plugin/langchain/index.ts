import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import fp from "fastify-plugin";

const langchain = async (fastify) => {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        temperature: 0,
        maxOutputTokens: 1000
    });

    fastify.decorate("llm", model);
}

export default fp(langchain);
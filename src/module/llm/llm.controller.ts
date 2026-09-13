import { FastifyRequest, FastifyReply } from "fastify";
import { HumanMessage } from "langchain";
import z from "zod";

const llmInputSchema = z.object({
    input: z.string().min(1)
})

export async function chat(req: FastifyRequest, reply: FastifyReply) {
    const { input } = llmInputSchema.parse(req.body);
    
    try {
        const response = await req.server.llm.invoke([
            new HumanMessage(input)
        ]);

        return reply.send({
            success: true,
            message: "Input executed successfully.",
            response
        });
    } catch (error) {
        return reply.send({
            success: false,
            message: error
        })
    }
}

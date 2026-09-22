import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

const inputSchema = z.object({
    input: z.string().min(1)
});

export async function chat(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { input } = inputSchema.parse(req.body);

        const response = await req.server.agent.invoke({
            messages: [
                {
                    role: "user",
                    content: input
                }
            ]
        });

        return reply.send({
            success: true,
            response: response.messages.at(-1)?.content
        });
    } catch (error) {
        return reply.status(500).send({
            success: false,
            message: error
        });
    }
}
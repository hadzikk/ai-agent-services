import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate (req: FastifyRequest, reply: FastifyReply) {
    try {
        await req.jwtVerify();
    } catch (error) {
        return reply.status(401).send({
            success: false,
            message: "Unauthorized."
        });
    }
}
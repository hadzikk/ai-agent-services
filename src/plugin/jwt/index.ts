import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "../../config/index.ts";

const jwt = async (fastify: FastifyInstance) => {
    await fastify.register(fastifyJwt, {
        secret: env.JWT_SECRET as string,
        sign: {
            expiresIn: "7d"
        }
    })
}

export default fp(jwt);
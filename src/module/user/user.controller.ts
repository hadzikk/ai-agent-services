import { FastifyReply, FastifyRequest } from "fastify";
import { MongoServerError } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ZodError, z } from "zod";
import * as services from "./user.service.ts";
import { env } from "../../config/index.ts";

const registerPayloadSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(72)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export async function register(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { email, password } = registerPayloadSchema.parse(req.body);

        const existingUser = await services.getUserByEmail(req.server.mongodb.db("llm"), email);

        if (existingUser) {
            return reply.status(409).send({
                success: false,
                message: "This email is already registered."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await services.createUser(req.server.mongodb.db("llm"), {
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                id: user.insertedId.toString(),
                email
            },
            env.JWT_SECRET as string,
            {
                expiresIn: "7d"
            }
        );

        return reply.status(201).send({
            success: true,
            message: "Registration successful.",
            data: {
                user: {
                    id: user.insertedId,
                    email
                },
                token
            }
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({
                success: false,
                message: "Validation failed.",
                errors: error.flatten()
            });
        }

        if (error instanceof MongoServerError && error.code === 11000) {
            return reply.status(409).send({
                success: false,
                message: "This email is already registered."
            });
        }

        req.log.error(error);

        return reply.status(500).send({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function login(req: FastifyRequest, reply: FastifyReply) {
    try {
        const payload = loginSchema.parse(req.body);

        const data = await services.login(
            req.server.mongodb.db("llm"),
            payload
        );

        return reply.status(200).send({
            success: true,
            message: "Login successful.",
            data
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return reply.status(400).send({
                success: false,
                message: "Validation failed.",
                errors: error.flatten()
            });
        }

        if (error instanceof Error && "statusCode" in error) {
            return reply.status((error as any).statusCode).send({
                success: false,
                message: error.message
            });
        }

        req.log.error(error);

        return reply.status(500).send({
            success: false,
            message: "Internal server error."
        });
    }
}

export async function me(req: FastifyRequest, reply: FastifyReply) {
    try {
        const user = await services.getProfile(
            req.server.mongodb.db("llm"),
            req.user.id
        );

        return reply.status(200).send({
            success: true,
            message: "User profile retrieved successfully.",
            data: user
        });
    } catch (error) {
        if (error instanceof Error && "statusCode" in error) {
            return reply.status((error as any).statusCode).send({
                success: false,
                message: error.message
            });
        }

        req.log.error(error);

        return reply.status(500).send({
            success: false,
            message: "Internal server error."
        });
    }
}
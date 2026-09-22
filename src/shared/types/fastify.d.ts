import "@fastify/jwt";
import "fastify";
import { MongoClient } from "mongodb";

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: {
            id: string;
            email: string;
        },
        user: {
          id: string;
          email: string;  
        }
    }
}

declare module "fastify" {
    interface FastifyInstance {
        mongodb: MongoClient
    }
}
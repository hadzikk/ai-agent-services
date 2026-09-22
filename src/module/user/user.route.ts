import { FastifyPluginAsync } from "fastify";
import * as controllers from "./user.controller.ts";
import { authenticate } from "../../hooks/authenticate.hook.ts";

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/login", controllers.login);
    fastify.post("/register", controllers.register);
    fastify.get("/me", { preHandler: authenticate }, controllers.me);
}

export default userRoutes;
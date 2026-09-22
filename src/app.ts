import Fastify from "fastify";
import redis from "./plugin/redis/index.ts";
import mongodb from "./plugin/mongo/index.ts"
import agent from "./plugin/langchain/agent.ts";
import routes from "./plugin/routes/index.ts";
import jwt from "./plugin/jwt/index.ts";

const app = Fastify({
    logger: true
});

await app.register(mongodb);
await app.register(redis);
await app.register(agent);
await app.register(jwt);
await app.register(routes);

export default app;
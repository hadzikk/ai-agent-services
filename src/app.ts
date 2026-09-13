import Fastify from "fastify";
import redis from "./plugin/redis/index.ts";
import langchain from "./plugin/langchain/index.ts";
import routes from "./plugin/routes/index.ts";

const app = Fastify({
    logger: true
});

await app.register(redis);
await app.register(langchain);
await app.register(routes);

export default app;
import { MongoClient, ServerApiVersion, type Db } from "mongodb";
import fp from "fastify-plugin";
import { env } from "../../config/index.ts";

const mongodb = async (fastify) => {
    const client = new MongoClient(env.MONGODB_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true
        }
    });

    try {
        await client.connect();
        const db = client.db();
        await db.command({ ping: 1 });
        fastify.decorate("mongo", db);
        fastify.log.info("MongoDB connected");
    } catch (err) {
        fastify.log.error(err, "MongoDB not connected");
        throw err;
    }

    fastify.addHook("onClose", async() => {
        await client.close();
        fastify.log.info("MongoDB disconnected.");
    });
}

export default fp(mongodb);
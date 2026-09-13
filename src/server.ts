import app from "./app.ts";
import { env } from "./config/index.ts";

app.listen({ port: parseInt(env.PORT) }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
});
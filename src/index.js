import Fastify from "fastify";
import todoRoutes from "./routes.js";
import databaseConnector from "./database.js";

const fastify = Fastify({ logger: true });
const logger = fastify.log;

// Register database.
// Note: This has to be first, other wise todo routes fails.
fastify.register(databaseConnector);

// Register routes.
fastify.register(todoRoutes);


// Run the server.
fastify.listen({ port: 7200 }, (error) => {
    if (error) {
        fastify.log.error(error); 
        process.exit(1);
    }

    logger.info("All is good. ✅");
});

import Fastify from "fastify";
import cors from "@fastify/cors";
import { todoRoutes } from "./todoRoutes.js";
import { authRoutes } from "./authRoutes.js";
import databaseConnector from "./database.js";

const fastify = Fastify({ logger: true, file: '../logs/server.log' });
const logger = fastify.log;

// Cors stuff
fastify.register(cors, {
  origin: (origin, callback) => {
    if (!origin || new URL(origin).hostname == "localhost") {
      //  Request from localhost will pass
      callback(null, true)
      return
    }
    // Generate an error on other origins, disabling access
    callback(new Error("Not allowed"), false)
  }
});

// Register database.
// Note: This has to be first, other wise todo routes fails.
fastify.register(databaseConnector);

// Register routes.
fastify.register(todoRoutes);
fastify.register(authRoutes);


// Run the server.
fastify.listen({ port: process.env.PORT }, (error) => {
    if (error) {
        fastify.log.error(error); 
        process.exit(1);
    }

    logger.info("All is good. ✅");
});

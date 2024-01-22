import fastifyPlugin from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";

/**
 * Connects to the mongo database using
 * fastify's methods.
 *
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function databaseConnector(fastify) {
   fastify.register(fastifyMongodb, 
        { 
            url: process.env.MONGO_URL,
            forceClose: true
        });
}

export default fastifyPlugin(databaseConnector);

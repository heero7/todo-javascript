import middie from "@fastify/middie";
import jwt from "jsonwebtoken";
/**
 * @param {FastifyInstance} fastify instance.
 * @param {Object} options for the plugin.
 */
export async function todoRoutes(fastify) {
    await fastify.register(middie);
    fastify.addHook("onRequest", async (request, reply) => {
        if (!request.headers || !request.headers.authorization) {
            fastify.log.error("Cannot access this route without authorization.");
            reply.code(401).send();
            return;
        }

        const authTokenHeader = request.headers.authorization;
        const authToken = authTokenHeader.replace("Bearer ", "");
        try {
            jwt.verify(authToken, process.env.JWT_SECRET);
            // todo: check if the token has expired before allowing access.
            fastify.log.info("Auth verified.");
        } catch (e) {
            fastify.log.error("Just to let you know, that token didn't work.");
            fastify.log.error(e.message);
            reply.code(401).send();
            return;
        }
    });

    const collection = fastify.mongo.db.collection("Todos");

    fastify.get("/todos", async () => {
        console.log("Getting the todos");
        const result = await collection.find().toArray();
        return result;
    });

    fastify.post("/todos", async () => {
    });
}


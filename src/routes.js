/**
 * @param {FastifyInstance} fastify instance.
 * @param {Object} options for the plugin.
 */
export default async function todoRoutes(fastify) {
    const collection = fastify.mongo.db.collection("Todos");

    fastify.get("/", async () => {
        return "Todo Application";
    });

    fastify.get("/todos", async () => {
        const result = await collection.find().toArray();
        return result;
    });

    fastify.post("/todos", async () => {
    });
}

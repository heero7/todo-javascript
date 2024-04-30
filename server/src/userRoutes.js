import { requireAuthentication } from "../middleware/requireAuth.js";

export async function userRoutes(fastify) {
  await requireAuthentication(fastify);

  const usersCollection = fastify.mongo.db.collection("Users");

  fastify.get("/users", async (request, reply) => {
    const { userId } = request;
    fastify.log.info("User entered: " + userId);

    const findResult = await usersCollection.findOne({ userId });
    if (!findResult) {
        fastify.log.info("No user found. UID: " + userId);
        reply.code(401).send();
        return;
    }

    const { userName, fullName, email } = findResult;

    reply.code(200).send({ userName, fullName, email });
  });
}

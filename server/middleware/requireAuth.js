import middie from "@fastify/middie";
import jwt from "jsonwebtoken";

/**
 * @param {FastifyInstance} fastify instance.
 */
export async function requireAuthentication(fastify) {
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
          // jwt.verify checks if the token has expired.
          const verifiedToken = jwt.verify(authToken, process.env.JWT_SECRET);
          fastify.log.info("Auth verified.");
          request.userId = verifiedToken.userId;
      } catch (e) {
          fastify.log.error("Just to let you know, that token didn't work.");
          fastify.log.error(e.message);
          request.userId = null;
          reply.code(401).send();
          return;
      }
  });
}

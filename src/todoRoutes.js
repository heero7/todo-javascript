import middie from "@fastify/middie";
import jwt from "jsonwebtoken";
import { v4 as uuidGenV4 } from "uuid";
/**
 * @param {FastifyInstance} fastify instance.
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

    const todoCollection = fastify.mongo.db.collection("Todos");

    fastify.get("/todos", async () => {
        const result = await todoCollection.find().toArray();
        return result;
    });

    fastify.post("/todos", async (request, reply) => {
        const { userId } = request;
        const { name } = request.body;
        if (!name) {
            fastify.log.error("Property missing. todo.name");
            reply.code(400).send({ error: "Property missing. todo.name" });
            return;
        }

        const newTodo = {
            todoId: uuidGenV4(),
            name,
            userId,
            createdAt: Date.now(),
            completed: false
        };

        // Can this by synchronous?
        await todoCollection.insertOne(newTodo);
        fastify.log.info("Successfully created a todo.");
        reply
            .code(201)
            .header("Content-Type")
            .type("application/json")
            .send(newTodo);
    });

    fastify.patch("/todos/:todoId", async (request, reply) => {
        const { userId } = request;
        const { updatedName, updateComplete } = request.body;
        if (!updatedName && !updateComplete) {
            fastify.log.error("todo.name or todo.completed is required.");
            reply.code(500).send({ error: "todo.name or todo.completed is required." });
            return;
        }

        const { todoId } = request.params;
        const existingTodo = await todoCollection.findOne({ userId, todoId });

        if (!existingTodo) {
            fastify.log.error(`No todo exists for this todoId=${todoId}`);
            reply.code(404).send({ error: "No todo exists for this id." });
            return;
        }

        const updater = {
            $set: {}
        }

        if (updatedName) {
            updater.$set.name = updatedName;
        }

        if (updateComplete) {
            updater.$set.completed = updateComplete;
        }

        const mongoDbOptions = { upsert: false };
        await todoCollection.updateOne({ todoId }, updater, mongoDbOptions);
        reply.code(200).send();
    });

    fastify.delete("/todos/:todoId", async (request, reply) => {
        const { userId } = request;
        const { todoId } = request.params;

        const { deletedCount } = await todoCollection.deleteOne({ userId, todoId });
        if (deletedCount === 1) {
            fastify.log.info(`Deleted todo with id=${todoId}`);
            reply.send(200).send();
            return;
        }

        fastify.log.error(`Could not delete todo with id=${todoId}. No todos found.`);
        reply.code(404).send({ error: "Could not find todo by id." });
    });

    fastify.delete("/todos", async (request, reply) => {
        const { userId } = request;
        const { deletedCount } = await todoCollection.deleteMany({ userId });

        if (deletedCount === 0) {
            fastify.log.error(`There were no todos to delete for userId=${userId}`);
            reply.code(404).send({ error: "There were no todos to delete." });
            return;
        }

        reply.send(200).send();
    });
}


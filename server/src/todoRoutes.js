import { v4 as uuidGenV4 } from "uuid";
import { requireAuthentication } from "../middleware/requireAuth.js";

/**
 * @param {FastifyInstance} fastify instance.
 */
export async function todoRoutes(fastify) {
    await requireAuthentication(fastify);

    const todoCollection = fastify.mongo.db.collection("Todos");

    fastify.get("/todos", async (request) => {
        const { userId } = request;
        const result = await todoCollection
            .find({ userId: userId })
            .toArray();
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


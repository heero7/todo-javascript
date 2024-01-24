import bcrypt from "bcryptjs";
import { v4 as uuidGenV4 } from "uuid";
/**
 * @param {FastifyInstance} fastify instance.
 * @param {Object} options for the plugin.
 */
export async function todoRoutes(fastify) {
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

/**
 * Gets all the user routes to register with fastify.
 * @param {FastifyInstance} fastify instance.
 */
export async function authRoutes(fastify) {
    const usersCollection = fastify.mongo.db.collection("Users");
    fastify.post("/signup", async (request, reply) => {
        // What do we need?
        // Storing in MongoDB
        // UserName: 
        // Password:
        // Email: 

        // Steps
        // 1. Does this email exist?
        // 2. Does this user name exist?
        // If no to the above return back unsuccessful.

        // ✅ Save the user info.

        // Validate using JSON Schema.
        // Todo: Feel like this could be a lot..
        // Todo: Get rid of this.
        const { userName, email, password } = request.body;
        if (!userName || !email || !password) {
            return { error: "Missing some important properties" };
        }

        // I think to check for a previous user name / email
        //usersCollection.findOne({ userName, email });

        const userId = uuidGenV4();
        return bcrypt.hash(password, Number(String(process.env.SALT_ROUNDS)), (bcryptError, hash) => {
            if (bcryptError) {
                fastify.log.error("Something has gone wrong with bcrypt");
                return;
            }

            const signUpUser = {
                userId,
                userName,
                email,
                password: hash
            };

            usersCollection.insertOne(signUpUser);  
            fastify.log.info("Successful inserting a new user!", signUpUser);

            return { userId };
        });
    });
}

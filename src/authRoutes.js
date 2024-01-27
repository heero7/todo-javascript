import bcrypt from "bcryptjs";
import { v4 as uuidGenV4 } from "uuid";
import jwt from "jsonwebtoken";

/**
 * Gets all the user routes to register with fastify.
 * @param {FastifyInstance} fastify instance.
 */
export async function authRoutes(fastify) {
    const usersCollection = fastify.mongo.db.collection("Users");
    fastify.post("/signup", async (request, reply) => {
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
        const hash = await bcrypt.hash(
            password,
            Number(String(process.env.SALT_ROUNDS)),
        );
        const signUpUser = {
            userId,
            userName,
            email,
            password: hash,
            createdDate: new Date(),
        };

        usersCollection.insertOne(signUpUser);
        fastify.log.info("Successfully created a user.");

        reply
            .code(201)
            .header("Content-Type")
            .type("application/json")
            .send({ userId });
    });

    fastify.post("/signin", async (request, reply) => {
        // To sign in
        // 1. Get the username
        // 2. Get the password
        // 3. Send back a token for the user
        const { userName, password } = request.body;
        const findResult = await usersCollection.findOne({ userName });
        if (!findResult) {
            fastify.log.info("No user found");
            reply.code(401).send();
            return;
        }

        const compareResult = await bcrypt.compare(password, findResult.password);
        if (!compareResult) {
            fastify.log.error("The password entered is not right!");
            // What should I return from the API? Bad request?
            // Answer: Unauthorized
            reply.code(401).send();
            return;
        }

        fastify.log.info("These credentials look good.");
        // Sign the web token
        const accessToken = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                userId: findResult.userId,
            },
            process.env.JWT_SECRET,
        );
        reply.code(200).send({ userId: findResult.userId, accessToken });
        // I like the idea of giving back a token that contains the user id
    });
}

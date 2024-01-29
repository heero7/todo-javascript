# Choices in tech

<u>Client</u>
- htmx hopefully
- Read this for some help on auth and ssr
    - https://www.bugsnag.com/blog/server-side-rendering-and-authenticated-content/

<u>Server</u>
- JavaScript
- Node.js
- Fastify.js

## MongoDb
For whatever reason the docs don't really describe how to connect
to your databsase. The connection string should look like this
`"mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority"`
<u>Key parts:</u>
- username: add a user from the Atlas 
- password: password for the user
- <u>db-name</u>: *Don't forget this, otherwise you won't connect to the DB*

## Server notes
- Added property forwarding to routes. Needed the userId, but didn't want to call `jwt.verify` again.
    - Reference: https://github.com/fastify/fastify/issues/303
- All routes run a middleware to extract and verify an access token.
    - Except for the auth routes
        - signin
        - signup

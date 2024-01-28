# Choices in tech

<u>Client</u>
- htmx hopefully

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

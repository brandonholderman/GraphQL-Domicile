const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
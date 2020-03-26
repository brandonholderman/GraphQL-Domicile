const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/graphql', graphqlHTTP({
    schema,
}))

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
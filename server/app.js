const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
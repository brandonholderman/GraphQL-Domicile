const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const db_conn = 'mongodb+srv://brandon:973mdm@graphql-domicile-5sd5o.mongodb.net/test?retryWrites=true&w=majority'


// DB Connection
mongoose.connect(db_conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('successful connection to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// let waiting = await axios({
//     url: 'https://stage2.bookdomicile.com/reservations',
//     method: 'post',
//     headers: {
//     Authorization: 'Bearer 528fe25c-2039-419c-9279-427e32ff7691'
//     },
//     data: {
//     query: `query Buildings($range: DateRangeInput) {
//                 buildings {
//                     totalCount
//                     nodes {
//                         id
//                         name
//                         rooms {
//                             id
//                             description
//                             availability(range: $range) {
//                                 date
//                                 price
//                                 status
//                                 }           
//                             }
//                         }
//                     }
//                 }`,
//     variables: {
//         range: {
//             from: `${fromDate}`,
//             to: `${toDate}`
//            }
//         }
//     }
// }).then((result) => {
//     return result.data
// }).catch((e) => {
//     console.log(e);
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
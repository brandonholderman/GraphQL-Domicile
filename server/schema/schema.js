const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema} = graphql

// Mock Data
let buildings = [
    {name: 'CR322', nodes: {id: '1'}},
    {name: 'CR401', nodes: {id: '2'}},
    {name: 'CR423', nodes: {id: '3'}},
]

const BuildingType = new GraphQLObjectType({
    name: 'Building',
    fields: () => ({
        totalCount: {type: GraphQLInt},
        nodes: {
            id: {type: GraphQLString},
            name: {type: GraphQLString}
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        building: {
            type: BuildingType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // Gets data from DB/Source
                return _.find(buildings, {id: args.nodes.id})
            }
        }
    }
})


// Dummy Data
// let buildings = [
//     {id: '1', name: 'CR322'},
//     {id: '2', name: 'CR401'},
//     {id: '3', name: 'CR423'},
// ]

// const BuildingType = new GraphQLObjectType({
//     name: 'Building',
//     fields: () => ({
//         totalCount: {type: GraphQLString},
//         id: {type: GraphQLString},
//         name: {type: GraphQLString},
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         building: {
//             type: BuildingType,
//             args: {id: {type: GraphQLString}},
//             resolve(parent, args){
//                 // code to get data from DB / other source
//                 _.find(buildings, {id: args.id})
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery
})
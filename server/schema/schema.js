const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql


// Mock Data
let buildings = [
    {totalCount: 3, id: 1, name: 'CR322'},
    {totalCount: 3, id: 2, name: 'CR401'},
    {totalCount: 3, id: 3, name: 'CR513'},
]

// let listings = [
//     {id: 1, name: 'CR322'},
//     {id: 2, name: 'CR401'},
//     {id: 3, name: 'CR513'},
// ]

const Building = new GraphQLObjectType({
    name: 'Building',
    fields: () => ({
        totalCount: {type: GraphQLInt},
        nodes: {
            type: new GraphQLList(Nodes),
            resolve(parent, args){
                console.log(parent)
                return _.find((listings, {id: args.id}))
            }
        }
    })
})

const Nodes = new GraphQLObjectType({
    name: 'nodes',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        building: {
            type: Building,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // Gets data from DB/Source
                return _.find(buildings, {id: args.nodes.id})
            }
        },
        nodes: {
            type: Nodes,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find(listings, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

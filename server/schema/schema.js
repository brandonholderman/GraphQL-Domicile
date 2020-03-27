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
    {totalCount: 3},
    {totalCount: 3},
    {totalCount: 3},
]

let listings = [
    {id: 'CR', name: 'CR322'},
    {id: 'MS', name: 'MS812'},
    {id: 'HL', name: 'HL809'},
]


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
    name: 'Nodes',
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
            args: {totalCount: {type: GraphQLInt}},
            resolve(parent, args){
                // Gets data from DB/Source
                return _.find(buildings, {totalCount: args.totalCount})
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

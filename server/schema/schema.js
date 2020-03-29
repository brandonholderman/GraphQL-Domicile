const mock_data = require('../data/mock_data.json');
const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql

const BuildingType = new GraphQLObjectType({
    name: 'buildings',
    fields: () => ({
        totalCount: {type: GraphQLInt},
        nodes: {
            type: new GraphQLList(NodeType),
            resolve(parent, args){
                console.log(parent.nodes)
                return parent.nodes
            }
        }
    })
})

const NodeType = new GraphQLObjectType({
    name: 'nodes',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        rooms: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buildings: {
            type: BuildingType,
            args: {totalCount: {type: GraphQLInt}},
            resolve(parent, args) {
                console.log(args.totalCount)
                return _.find(mock_data, {totalCount: args.totalCount})
            }
        },
        nodes: {
            type: NodeType,
            parent: mock_data['buildings'],
            resolve(parent, args) {
                console.log(parent)
                return _.find(mock_data, 'nodes');
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
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
    GraphQLFloat,
} = graphql

const BuildingType = new GraphQLObjectType({
    name: 'buildings',
    fields: () => ({
        totalCount: {type: GraphQLInt},
        nodes: {
            type: new GraphQLList(NodeType),
            resolve(parent, args) {
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
        rooms: {
            type: new GraphQLList(RoomType),
            resolve(parent, args) {
                console.log(parent.rooms)
                return parent.rooms
            }
        }
    })
})

const RoomType = new GraphQLObjectType({
    name: 'rooms',
    fields: () => ({
        id: {type: GraphQLID},
        description: {type: GraphQLString},
        availbility: {
            type: new GraphQLList(AvailabilityType),
            resolve(parent, args) {
                console.log(parent.id)
                return parent.availability
            }
        }
    })
})

const AvailabilityType = new GraphQLObjectType({
    name: 'availability',
    fields: () => ({
        date: {type: GraphQLString},
        price: {type: GraphQLFloat},
        status: {type: GraphQLString}
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
                console.log(parent.nodes)
                return _.find(mock_data, 'nodes');
            }
        },
        rooms: {
            type: RoomType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _find(mock_data, {id: args.id})
            }
        },
        availability: {
            type: AvailabilityType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _find(mock_data, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
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
                console.log(parent)
                return _.filter(mock_data, parent.nodes.id)
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
                // Gets data from DB/Source
                return _.find(mock_data, {totalCount: args.totalCount})
            }
        },
        nodes: {
            type: NodeType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return _.find(mock_data, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

// const Building = new GraphQLObjectType({
//     name: 'building',
//     fields: () => ({
//         name: {type: GraphQLString},
//         totalCount: {type: GraphQLInt}
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         buildings: {
//             type: Building,
//             args: {name: {type: GraphQLString}},
//             resolve(parent, args) {
//                 // Gets data from DB/Source
//                 console.log(args.name)
//                 return _.find(mock_data, {name: args.name})
//             }
//         }
//     }
// });

// module.exports = new GraphQLSchema({
//     query: RootQuery
// });
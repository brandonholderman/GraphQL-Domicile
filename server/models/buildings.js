const mongoose = require('mongoose')
const nodeSchema = require('./nodes')
const Schema = mongoose.Schema

const buildingSchema = new Schema({
    totalCount: Number,
    nodes: [{ type: Schema.Types.ObjectId, ref: 'Nodes' }],
})

module.exports = mongoose.model('Buildings', buildingSchema)
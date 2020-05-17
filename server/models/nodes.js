const mongoose = require('mongoose')
const roomSchema = require('./rooms')
const Schema = mongoose.Schema

const nodeSchema = new Schema({
    id: String,
    name: String,
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Rooms' }],
})

module.exports = mongoose.model('Nodes', nodeSchema)
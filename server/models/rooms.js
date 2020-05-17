const mongoose = require('mongoose')
const availabilitySchema = require('./availability')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    id: String,
    description: String,
    availability: [{ type: Schema.Types.ObjectId, ref: 'Availability' }],
})

module.exports = mongoose.model('Rooms', roomSchema)
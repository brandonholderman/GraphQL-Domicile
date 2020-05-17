const mongoose = require('mongoose')
const Schema = mongoose.Schema

const availabilitySchema = new Schema({
    date: Date,
    price: Number,
    status: String,
})

module.exports = mongoose.model('Availability', availabilitySchema)
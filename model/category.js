const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    distributor: String
})

exports.Category = mongoose.model('Categories', categorySchema)
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    dictributor: String
})

exports.Category = mongoose.model('Categories', categorySchema)
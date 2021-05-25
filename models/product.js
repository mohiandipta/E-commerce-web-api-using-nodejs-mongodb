const mongoose = require('mongoose')

// productSchema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})


exports.Product = mongoose.model('Product', productSchema)

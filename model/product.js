const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: String
})

exports.Product = mongoose.model('Product', productSchema)

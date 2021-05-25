const mongoose = require('mongoose')

// userSchema
const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})


exports.User = mongoose.model('User', userSchema)

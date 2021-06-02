const mongoose = require('mongoose')
const { User } = require('./user')

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Boolean,
        default: false
    },
    payment: {
        paid: {
            type: Boolean
        }
    }
})


exports.Order = mongoose.model('Order', orderSchema)
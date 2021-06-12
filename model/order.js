const mongoose = require('mongoose')
const { User } = require('./user')
const { OrderItem } = require('./OrderItem')

const orderSchema = mongoose.Schema({
    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: OrderItem,
        required: true
    },
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


//changing _id key to id for further use
orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
orderSchema.set('toJSON', {
    virtuals: true,
})


exports.Order = mongoose.model('Order', orderSchema)
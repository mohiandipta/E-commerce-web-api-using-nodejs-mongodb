const mongoose = require('mongoose');
const { Category } = require('./category')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    image: [{
        type: String,
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    countInStock: {
        type: Number,
        min: 0,
        max: 300
    },
    rating: {
        type: Number,
        default: 0
    },
    numbReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})


//changing _id key to id for further use
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
productSchema.set('toJSON', {
    virtuals: true,
})

exports.Product = mongoose.model('Product', productSchema)

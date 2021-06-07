const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        retuired: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})


//changing _id key to id for further use
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
})


exports.User = mongoose.model('User', userSchema)
exports.userSchema = userSchema;
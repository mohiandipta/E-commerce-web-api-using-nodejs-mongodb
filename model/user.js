const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        retuired: true
    },
    lastName: {
        type: String,
        retuired: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})


exports.User = mongoose.model('User', userSchema)
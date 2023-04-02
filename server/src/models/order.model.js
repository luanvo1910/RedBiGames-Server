const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')
const Product = require('./product.model')

const Order = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: User
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: Product
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    total: Number,
    email: String,
    address: String
})

module.exports = mongoose.model('Order', Order);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')
const Product = require('./product.model')

const Cart = new Schema({
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
})

module.exports = mongoose.model('Cart', Cart);
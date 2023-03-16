const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./brand.model');
const Category = require('./category.model');

const Product = new Schema({
    name: {
        type: String,
        unique: [true, "product name already exists"],
    },
    description: {
        type: String,
        minLength: [8, "Description must be at least 8 character"],
        maxLength: 255,
    },
    price: Number,
    image: String,
    stock: Number,
    createAt: {
        type: Date, 
        default: Date.now
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: Category
    },
    brand: {
        type: Schema.Types.ObjectId, 
        ref: Brand
    }    
},
{collection: 'products'}
)

module.exports = mongoose.model('Product', Product);
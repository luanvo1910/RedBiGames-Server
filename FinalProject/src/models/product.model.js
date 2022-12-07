const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./brand.model');
const Category = require('./category.model');

const Product = new Schema({
    name: String,
    decription: String,
    price: String,
    image: String,
    stock: Number,
    createAt: {type: Date, default: Date.now},
    category: {type: mongoose.Schema.Types.ObjectId, ref: Category},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: Brand}    
},
{collection: 'products'}
)

module.exports = mongoose.model('Product', Product);
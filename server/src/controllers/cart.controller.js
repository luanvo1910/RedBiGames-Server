const { response } = require('express');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Cart = require('../models/cart.model')

class CartController {
    async load(req, res) {
        const userId = req.userId;
        const cart = await Cart.findOne({userId: userId});

        if (cart) {
            return res.json({ loaded: true, message: 'Loaded your cart', cart: cart })
        }

        try {
            const newCart = new Cart({
                userId
            })
            await newCart.save()

            res.json({ created: true, message: 'Cart created successfully', cart: newCart})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async addProduct(req, res) {
        const userId = req.userId;
        const {_id} = req.body;
        const cart = await Cart.findOne({userId: userId});

        if (cart) {
            const products = cart.products;
            const checkProducts = products.indexOf(_id);

            if(checkProducts === -1)
            {
                products.push(_id);
                let updatedCart = await Cart.findOneAndUpdate({userId: userId}, {products: products})
                return res.json({ added: true, message: 'Added product to your cart', cart: cart })
            }
            return res.json({ added: false, message: 'Product already in your cart'})
        }
        try {
            const products = [];
            products.push(_id);
            const newCart = new Cart({
                userId,
                products
            })
            await newCart.save()
            res.json({ created: true, message: 'Cart created successfully', cart: newCart})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async removeProduct(req, res) {
        const userId = req.userId;
        const {_id} = req.body;
        const cart = await Cart.findOne({userId: userId});
        try {
            // const products = cart.products.filter(p => p !== _id);
            // console.log(cart)
            const findProduct = cart.products.indexOf(_id);
            cart.products.splice(findProduct, 1);
            let updatedCart = await Cart.findOneAndUpdate({_id: cart._id}, {products: cart.products})
            res.json({ removed: true, message: 'Product removed successfully', cart: cart})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }


}
module.exports = new CartController;
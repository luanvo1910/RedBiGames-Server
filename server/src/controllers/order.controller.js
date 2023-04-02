const { response } = require('express');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

class OrderController {
    async list(req, res) {
        try {
            const orders = await Order.find({}).populate('userId').populate('products');
            res.json({ success: true, orders })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async userList(req, res) {
        const userId = req.userId;
        try {
            const orders = await Order.find({userId: userId}).populate('userId');
            res.json({ success: true, orders })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async addOrder(req, res) {
        const {userId, products, total, email, address} = req.body;
        console.log(req.body)
        try {
            const newOrder = new Order({
                userId,
                products,
                total,
                email,
                address
            })
            await newOrder.save()
            res.json({ success: true, message: 'Successfully checkout', Order: newOrder})

            const cart = await Cart.findOne({userId: userId});
            const newCartProducts = [];
            await Cart.findOneAndUpdate({userId: userId}, {products: newCartProducts})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}
module.exports = new OrderController;
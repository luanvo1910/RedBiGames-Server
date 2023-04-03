const { response } = require('express');
const nodemailer =  require('nodemailer');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

class OrderController {
    async list(req, res) {
        try {
            const orders = await Order.find({}).populate('userId').populate('products');
            res.json({ success: true, orders: orders })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async userList(req, res) {
        const userId = req.userId;
        try {
            const orders = await Order.find({userId: userId}).populate('userId').populate('products');
            res.json({ success: true, orders: orders })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async addOrder(req, res) {
        const {userId, products, total, email, address} = req.body;
        try {
            const newOrder = new Order({
                userId,
                products,
                total,
                email,
                address
            })
            await newOrder.save()
            res.json({ success: true, message: 'Successfully checkout', order: newOrder})

            const cart = await Cart.findOne({userId: userId});
            const newCartProducts = [];
            await Cart.findOneAndUpdate({userId: userId}, {products: newCartProducts})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async sendmail (req, res) {
        const {_id, userId, products, total, email, address} = req.body
        const order = await Order.find({_id: _id}).populate('userId').populate('products');
        console.log(order)

        // const mailUser = order.userId.username;
        var transporter =  nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'redbigames@gmail.com',
                pass: 'bgpobttkmjgdwktx'
            },
        });

        var content = '';
        content += 
        `
            <div>
                <div>
                    <h1> order invoice</h1>
                    <h4>Address: ${address}</h4>
                    <h4>Total: ${total.toLocaleString('en')}</h4>
                    <h4>http://localhost:3000/orders for more order details</h4>
                </div>
            </div>
        `;

        var mainOptions = {
            from: 'Redbi Games',
            to: email,
            subject: 'Order invoice from RedBi Games',
            html: content 
        }

        transporter.sendMail(mainOptions)
        .then((info) => {
            console.log(`Message sent: ${info.response}`);
            res.json({ success: true, message: 'Successfully sent email', order: order})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ success: false, message: 'Internal server error' })
        })

    }
}
module.exports = new OrderController;
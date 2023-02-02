const { response } = require('express');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

class ProductController {
    create(req, res, next) {
        const product = new Product(req.body);
        product.save()
        .then(product => {
            console.log('req.body:',req.body);
            res.status(200).json('added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    }

    list(req, res, next) {
        Product.find({})
        .then(products => res.json(products))
        .catch(err => next(err));
    }

    details(req, res, next) {
        Product.find({_id: req.params._id})
        .then(product => res.json(product))
        .catch(err => next(err));
    }

    async update (req,res, next) {
        const {name, decription, price, image, stock, brand} = req.body

        if(!name)
        return res.status(400).json({success: false, message:'error'})

        try{
            let updatedProduct = {
                name: name || 'Unnamed',
                decription: decription,
                price: price,
                image: image,
                stock: stock,
                brand: brand
            }
            const productUpdateCondition = {_id: req.params._id, user: req.userId}

            updatedProduct = await Product.findOneAndUpdate(productUpdateCondition, updatedProduct, {new: true})

            if(!updatedProduct)
            return res.status(401).json({success: false, message: 'Product not found or user not authorised'})

            res.json({success: true, message: 'Product updated successfully'})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params.id, user: req.userId}
            const deletedProduct = await Product.findOneAndDelete(deleteCondition)

            if(!deletedProduct)
            return res.status(401).json({success: false, message: 'Product not found'})

            res.json({success: true, message: 'Product deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }
}

module.exports = new ProductController;
const { response } = require('express');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

class ProductController {
    async create(req, res) {
        const {name, decription, price, image, stock, brand, category} = req.body;
        console.log(req.body);
        console.log(req.userId);
        const product = await Product.findOne({name});
        if (product) {
            return res
				.status(400)
				.json({ success: false, message: 'Product has already exits' })
        }
        try {
            const newProduct = new Product({
                name,
                decription,
                price,
                image,
                stock,
                brand,
                category
            })
            await newProduct.save()

            res.json({ success: true, message: 'Product created successfully', product: newProduct})
        } catch (error) {
            console.log(error)
		    res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async list(req, res) {
        try {
            const products = await Product.find({});
            res.json({ success: true, products })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    details(req, res, next) {
        Product.find({_id: req.params._id})
        .then(product => res.json(product))
        .catch(err => next(err));
    }

    async update (req,res, next) {
        const {name, decription, price, image, stock, brand, category} = req.body

        try{
            let updatedProduct = {
                name: name || 'Unnamed',
                decription: decription || 'no description',
                price: price || 'unknown',
                image: image || 'https://teamon.com.tr/assets/urunler/resim-yok-ccce33db184baf7db304f6b11d141b3327a07c3ccf4b6e3f2c92d7860b6e0d34.png',
                stock: stock || 0,
                brand: brand,
                category: category
            }
            const productUpdateCondition = {_id: req.params._id, user: req.userId}

            updatedProduct = await Product.findOneAndUpdate(productUpdateCondition, updatedProduct, {new: true})

            if(!updatedProduct)
            return res.status(401).json({success: false, message: 'Product not found or user not authorised'})

            res.json({success: true, message: 'Product updated successfully', product: updatedProduct})

        }
        catch (error){
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async delete (req, res) {
        try {
            const deleteCondition = {_id: req.params._id, user: req.userId}
            const deletedProduct = await Product.findOneAndDelete(deleteCondition)

            if(!deletedProduct)
            return res.status(401).json({success: false, message: 'Product not found'})

            res.json({success: true, message: 'Product deleted successfully'})
        }catch(error) {
            console.log(error)
            res.status(404).json({success: false, message: 'Internal Server Error'})
        }
    }

    async search (req, res, next) {
        try {
            const { q } = req.query;
            let products
            if (q.length < 1){
                products = await Product.find({});
            } else {
                products = await Product.find({ name: { $regex: q, $options: 'i' } });
            } 
            if (products.length < 1) throw new ErrorHandler(404, 'No product found');

            res.json({ success: true, products });
        } catch (error) {
           next(error);
        }
    }
}

module.exports = new ProductController;
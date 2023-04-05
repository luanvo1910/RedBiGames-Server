const Product = require('../models/product.model');
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");

class ProductController {
    async create(req, res) {
        const {name, description, price, stock, brand, category} = req.body;
        const image = await cloudinary.uploader.upload(req.file.path);
        const product = await Product.findOne({name});
        if (product) {
            return res
				.status(400)
				.json({ success: false, message: 'Product has already exits' })
        }
        try {
            const newProduct = new Product({
                name,
                description,
                price,
                image: image.secure_url,
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
            const products = await Product.find({}).populate('brand').populate('category');
            res.json({ success: true, products })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async update (req,res, next) {
        const {name, description, price, stock, brand, category} = req.body
        const image = await cloudinary.uploader.upload(req.file.path);

        try{
            let updatedProduct = {
                name: name || 'Unnamed',
                description: description || 'no description',
                price: price || 'unknown',
                image: image.secure_url,
                stock: stock || 0,
                brand: brand,
                category: category
            }
            const productUpdateCondition = {_id: req.params._id}

            updatedProduct = await Product.findByIdAndUpdate(productUpdateCondition, updatedProduct, {new: true})

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
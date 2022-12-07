const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

class ProductController {
    create(req, res, next) {
        const product = new Product(req.body);
        product.save()
        .then(product => {
            res.status(200).json({'product':'added successfully'});
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
}

module.exports = new ProductController;
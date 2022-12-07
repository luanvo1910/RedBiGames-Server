const Category = require('../models/category.model');

class CategoryController {
    index(req, res, next) {
        Category.find({})
        .then(categories => res.json(categories))
        .catch(err => next(err));
    }
}

module.exports = new CategoryController;
const Brand = require('../models/brand.model');

class BrandController {
    index(req, res, next) {
        Brand.find({})
        .then(brands => res.json(brands))
        .catch(err => next(err));
    }
}

module.exports = new BrandController;
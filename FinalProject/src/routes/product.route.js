const controller = require('../controllers/product.controller');

module.exports = function productRoute(app) {
    // app.post('/product/create', controller.create)
}
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.post('/create', productController.create);
router.get('/', productController.list);
router.get('/details/:_id', productController.details);

module.exports = router;
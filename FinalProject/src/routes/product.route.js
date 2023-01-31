const controller = require('../controllers/product.controller');
const verifyToken = require('../middleware/auth');

module.exports = function productRoute(app) {
    // app.post('/product/create', controller.create)
}
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.post('/create', verifyToken, productController.create);
router.get('/', productController.list);
router.get('/details/:_id', productController.details);
router.put('/:id', verifyToken, productController.update);

module.exports = router;
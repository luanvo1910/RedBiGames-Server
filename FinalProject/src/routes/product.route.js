const controller = require('../controllers/product.controller');
const verifyToken = require('../middleware/auth');

const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.list);
router.get('/details/:_id', productController.details);
router.post('/create', verifyToken, productController.create);
router.put('/update/:_id', verifyToken,productController.update);
router.delete('/delete/:_id', verifyToken, productController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const cartController = require('../controllers/cart.controller');

router.get('/', authJwt.verifyToken, cartController.load);
router.put('/add', authJwt.verifyToken, cartController.addProduct);
router.put('/remove', authJwt.verifyToken, cartController.removeProduct);

module.exports = router;
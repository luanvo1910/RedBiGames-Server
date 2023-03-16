const controller = require('../controllers/product.controller');
const authJwt = require('../middleware/auth');
const multer = require("multer");
const upload = require("../utils/multer");

const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/', productController.list);
router.get('/details/:_id', productController.details);
router.post('/create', authJwt.verifyToken, upload.single("image"), productController.create);
router.put('/update/:_id', authJwt.verifyToken, upload.single("image"), productController.update);
router.delete('/delete/:_id', authJwt.verifyToken, productController.delete);
router.get('/search', productController.search);

module.exports = router;
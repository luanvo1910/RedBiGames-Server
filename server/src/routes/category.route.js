const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.index);
router.post('/create', authJwt.verifyToken, categoryController.create);
router.put('/update/:_id', authJwt.verifyToken, categoryController.update);
router.delete('/delete/:_id', authJwt.verifyToken, categoryController.delete);

module.exports = router;
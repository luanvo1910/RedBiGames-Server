const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.index);
router.post('/create', verifyToken, categoryController.create);
router.put('/update/:_id', verifyToken, categoryController.update);
router.delete('/delete/:_id', verifyToken, categoryController.delete);

module.exports = router;
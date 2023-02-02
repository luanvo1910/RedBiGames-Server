const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const brandController = require('../controllers/brand.controller');

router.get('/', brandController.index);
router.post('/create', verifyToken, brandController.create);
router.put('/update/:_id', verifyToken, brandController.update);
router.delete('/delete/:_id', verifyToken, brandController.delete);

module.exports = router;
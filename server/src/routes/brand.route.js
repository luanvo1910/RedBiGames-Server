const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const brandController = require('../controllers/brand.controller');

router.get('/', brandController.index);
router.post('/create', authJwt.verifyToken, brandController.create);
router.put('/update/:_id', authJwt.verifyToken, brandController.update);
router.delete('/delete/:_id', authJwt.verifyToken, brandController.delete);

module.exports = router;
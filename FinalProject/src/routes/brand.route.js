const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand.controller');

router.get('/', brandController.index);

module.exports = router;
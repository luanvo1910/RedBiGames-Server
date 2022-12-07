const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand.controller');

router.use('/', brandController.index);

module.exports = router;
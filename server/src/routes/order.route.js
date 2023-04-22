const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const orderController = require('../controllers/order.controller');

router.get('/', authJwt.verifyToken, orderController.list);
router.get('/user', authJwt.verifyToken, orderController.userList);
router.post('/add', authJwt.verifyToken, orderController.addOrder);
router.post('/mailing', authJwt.verifyToken, orderController.sendmail);
router.put('/minunProduct', authJwt.verifyToken, orderController.minunProduct);

module.exports = router;
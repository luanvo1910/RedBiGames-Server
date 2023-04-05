const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/auth');

const chatController = require('../controllers/chat.controller');

router.get('/admin', authJwt.verifyToken, chatController.listConversationAdmin);
router.get('/', authJwt.verifyToken, chatController.loadConversation);
router.post('/message', authJwt.verifyToken, chatController.addMessage);

module.exports = router;
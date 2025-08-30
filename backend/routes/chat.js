const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/chatController');
const { auth } = require('../middlewares/auth');

// GET /api/chat/:userId
router.get('/:userId', auth, getMessages);

// POST /api/chat
router.post('/', auth, sendMessage);

module.exports = router; 
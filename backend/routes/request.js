const express = require('express');
const router = express.Router();
const { sendRequest, getRequests, updateRequest } = require('../controllers/requestController');
const { auth, authorizeRoles } = require('../middlewares/auth');

// POST /api/request
router.post('/', auth, authorizeRoles('investor'), sendRequest);

// GET /api/request
router.get('/', auth, getRequests);

// PATCH /api/request/:id
router.patch('/:id', auth, authorizeRoles('entrepreneur'), updateRequest);

module.exports = router; 
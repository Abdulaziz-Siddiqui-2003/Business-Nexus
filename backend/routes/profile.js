const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getEntrepreneurs, getInvestors } = require('../controllers/profileController');
const { auth, authorizeRoles } = require('../middlewares/auth');

// GET /api/profile/:id
router.get('/:id', auth, getProfile);

// PUT /api/profile
router.put('/', auth, updateProfile);

// GET /api/profile/entrepreneurs
router.get('/entrepreneurs', auth, authorizeRoles('investor'), getEntrepreneurs);

// GET /api/profile/investors
router.get('/investors', auth, authorizeRoles('entrepreneur'), getInvestors);

module.exports = router; 
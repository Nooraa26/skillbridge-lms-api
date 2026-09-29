const express = require('express');
const router = express.Router();

// Import fungsi controller register dan login (sesuaikan lokasinya jika berbeda)
const { register, login } = require('../controllers/authController.js');

// Endpoint untuk Register: POST /api/auth/register
router.post('/register', register);

// Endpoint untuk Login: POST /api/auth/login
router.post('/login', login);

module.exports = router;
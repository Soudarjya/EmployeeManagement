const express = require('express');
const { register, login,refreshToken } = require('../controller/authController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token',refreshToken);

// Example of role-based route
router.get('/admin', authenticate, authorizeRoles('Admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

module.exports = router;

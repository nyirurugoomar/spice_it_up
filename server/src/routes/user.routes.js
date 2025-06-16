const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/user.controller');

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;

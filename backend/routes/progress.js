// routes/progress.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify the token from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

router.post('/update-session', verifyToken, async (req, res) => {
  try {
    // Find the user by the ID decoded from the token
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Create the new session object using data from the request or defaults
    const newSession = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      difficulty: req.body.difficulty || 'easy',
      score: req.body.score || '0'
    };

    // Push the new session to the user's exerciseHistory array
    user.exerciseHistory.push(newSession);
    await user.save();

    res.json({ message: 'Session updated', session: newSession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

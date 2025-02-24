const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { checkAndUpdateTrophies } = require('./checkAndUpdateTrophies'); 

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

// Update Session and Achievements:
router.post('/update-session', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newSession = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
      difficulty: req.body.difficulty || 'easy',
      score: req.body.score || 0,
      correct: req.body.correct || 0,
      incorrect: req.body.incorrect || 0,
      duration: req.body.duration || 0 
    };

    user.exerciseHistory.push(newSession);
    
    const sessionScore = parseInt(newSession.score, 10) || 0;
    if (sessionScore > (user.highScore || 0)) {
        user.highScore = sessionScore;
    }

    await user.save();

    await checkAndUpdateTrophies(user);

    res.json({ 
        message: 'Session updated', 
        session: newSession, 
        highScore: user.highScore || 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      res.json({
          exerciseHistory: user.exerciseHistory || [],
          achievements: user.trophies || [],
          highScore: user.highScore || 0
      });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// routes/progress.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// API Endpoint to Get User Progress and Achievements
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return exercise history and achievements
        res.json({
            exerciseHistory: user.exerciseHistory || [],
            achievements: user.trophies || []
        });
    } catch (error) {
        console.error('Error fetching progress data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

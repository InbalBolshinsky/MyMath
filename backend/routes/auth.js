// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'Strict', // 'Lax' works well for same-origin requests
            maxAge: 3600000, // 1 hour
            path: '/'
        });

        console.log('Token set in cookies:', token);
        res.json({ message: `Welcome back, ${username}!` });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Check User Session
router.get('/check-session', (req, res) => {
    console.log('Cookies received on session check:', req.cookies); // Debugging log
    const token = req.cookies?.token;

    if (!token) {
        console.warn('No token found in cookies');
        return res.status(401).json({ error: 'No session found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Session validated for user:', decoded.username);
        res.json({ user: decoded.username });
    } catch (err) {
        console.error('Session Check Error:', err.message);
        res.status(401).json({ error: 'Invalid or expired session' });
    }
});

// User Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false // Set to true in production with HTTPS
    });
    console.log('User logged out, token cleared from cookies');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;

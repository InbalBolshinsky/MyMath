const express = require('express');
const router = express.Router();

// Simple Test Route
router.get('/test', (req, res) => {
    res.send('Auth route is working!');
});

module.exports = router;

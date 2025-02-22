const express = require('express');
const router = express.Router();

// Simple Test Route
router.get('/test', (req, res) => {
    res.send('Progress route is working!');
});

module.exports = router;

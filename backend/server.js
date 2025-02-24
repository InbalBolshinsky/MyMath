// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true, // Allow credentials (cookies) to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser()); // Required to parse cookies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB: MyMath'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Use authentication and progress routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// Default route for testing
app.get('/', (req, res) => res.send('Server is running!'));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

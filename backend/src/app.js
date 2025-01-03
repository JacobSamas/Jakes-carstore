const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Add the auth routes here

// Default Route
app.get('/', (req, res) => res.send('Welcome to Jake\'s Carstore API!'));

module.exports = app;

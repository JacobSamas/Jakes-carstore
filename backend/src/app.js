const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 
const carRoutes = require('./routes/carRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => res.send('Welcome to Jake\'s Carstore API!'));
app.use('/api/cars', carRoutes); 
module.exports = app;

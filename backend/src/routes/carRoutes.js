const express = require('express');
const { addCar, getAllCars, updateCar, deleteCar, searchCars } = require('../controllers/carController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new car (protected)
router.post('/add', authMiddleware, addCar);

// Get all cars (public)
router.get('/', getAllCars);

// Update a car (protected)
router.put('/:id', authMiddleware, updateCar);

// Delete a car (protected)
router.delete('/:id', authMiddleware, deleteCar);

// Search or filter cars (public)
router.get('/search', searchCars);

module.exports = router;

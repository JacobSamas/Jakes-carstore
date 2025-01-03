const express = require('express');
const { addCar, getAllCars, updateCar, deleteCar, searchCars } = require('../controllers/carController');
const router = express.Router();

// Add a new car
router.post('/add', addCar);

// Get all cars
router.get('/', getAllCars);

// Update a car
router.put('/:id', updateCar);

// Delete a car
router.delete('/:id', deleteCar);

// Search or filter cars
router.get('/search', searchCars);

module.exports = router;

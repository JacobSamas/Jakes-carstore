const express = require('express');
const { addCar, getAllCars, updateCar, deleteCar, searchCars } = require('../controllers/carController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a new car (protected for admins)
router.post('/add', authMiddleware, roleMiddleware(['admin']), addCar);

// Get all cars (public)
router.get('/', getAllCars);

// Update a car (protected for admins)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCar);

// Delete a car (protected for admins)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCar);

// Search or filter cars (public)
router.get('/search', searchCars);

module.exports = router;

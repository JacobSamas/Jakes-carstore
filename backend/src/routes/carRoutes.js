const express = require('express');
const {
  addCar,
  getAllCars,
  getCarById, // New controller for fetching a car by ID
  updateCar,
  deleteCar,
  searchCars
} = require('../controllers/carController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a new car (protected for admins)
router.post('/add', authMiddleware, roleMiddleware(['admin']), addCar);

// Get all cars (public)
router.get('/', getAllCars);

// Get a car by ID (public)
router.get('/:id', getCarById); // <-- New route

// Update a car (protected for admins)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateCar);

// Delete a car (protected for admins)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteCar);

// Search or filter cars (public)
router.get('/search', searchCars);

module.exports = router;

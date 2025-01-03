const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a transaction (protected)
router.post('/add', authMiddleware, addTransaction);

// Get all transactions (protected)
router.get('/', authMiddleware, getAllTransactions);

module.exports = router;

const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a transaction (protected for authenticated users)
router.post('/add', authMiddleware, roleMiddleware(['user', 'admin']), addTransaction);

// Get all transactions (protected for admins)
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllTransactions);

module.exports = router;

const express = require('express');
const { addTransaction, getAllTransactions } = require('../controllers/transactionController');
const router = express.Router();

// Add a transaction
router.post('/add', addTransaction);

// Get all transactions
router.get('/', getAllTransactions);

module.exports = router;

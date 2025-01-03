const db = require('../config/database');

// Add a new transaction
exports.addTransaction = async (req, res) => {
    const { carId, buyerId, sellerId, price } = req.body;

    try {
        // Add the transaction to the database
        const [result] = await db.query(
            'INSERT INTO transactions (car_id, buyer_id, seller_id, price) VALUES (?, ?, ?, ?)',
            [carId, buyerId, sellerId, price]
        );

        res.status(201).json({ message: 'Transaction added successfully', transactionId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding transaction', error: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const [transactions] = await db.query(`
            SELECT t.id, t.price, t.transaction_date, c.title AS car_title, 
                   b.name AS buyer_name, s.name AS seller_name
            FROM transactions t
            JOIN cars c ON t.car_id = c.id
            JOIN users b ON t.buyer_id = b.id
            JOIN users s ON t.seller_id = s.id
        `);

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
};

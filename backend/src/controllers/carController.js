const db = require('../config/database');

// Add a new car
exports.addCar = async (req, res) => {
    const { title, description, price, condition, ownerId } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO cars (title, description, price, `condition`, owner_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, price, condition, ownerId]
        );

        res.status(201).json({ message: 'Car added successfully', carId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error: error.message });
    }
};

// Get all cars
exports.getAllCars = async (req, res) => {
    try {
        const [cars] = await db.query('SELECT * FROM cars');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error: error.message });
    }
};

// Update a car's details
exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, condition } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE cars SET title = ?, description = ?, price = ?, `condition` = ? WHERE id = ?',
            [title, description, price, condition, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json({ message: 'Car updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error: error.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM cars WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error: error.message });
    }
};

// Search or filter cars
exports.searchCars = async (req, res) => {
    const { query, minPrice, maxPrice } = req.query;

    try {
        let sql = 'SELECT * FROM cars WHERE 1=1';
        const params = [];

        if (query) {
            sql += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${query}%`, `%${query}%`);
        }
        if (minPrice) {
            sql += ' AND price >= ?';
            params.push(minPrice);
        }
        if (maxPrice) {
            sql += ' AND price <= ?';
            params.push(maxPrice);
        }

        const [cars] = await db.query(sql, params);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error searching cars', error: error.message });
    }
};

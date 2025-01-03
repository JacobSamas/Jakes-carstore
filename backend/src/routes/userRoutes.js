const express = require('express');
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get all users (admin only)
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers);

// Update user role (admin only)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateUserRole);

// Delete user (admin only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;

const jwt = require('jsonwebtoken');

// Middleware to verify JWT
exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach decoded payload to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

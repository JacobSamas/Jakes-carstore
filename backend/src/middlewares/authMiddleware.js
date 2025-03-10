const jwt = require('jsonwebtoken');

// Middleware to verify JWT
exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user details, including role, to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};


// Middleware to check for specific roles
exports.roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
};

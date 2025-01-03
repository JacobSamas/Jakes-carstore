const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Cars API is working!' });
});

module.exports = router;

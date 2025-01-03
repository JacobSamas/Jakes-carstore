const app = require('./app');
const dotenv = require('dotenv');
const db = require('./config/database');

dotenv.config();

const PORT = process.env.PORT || 5001;

// Test DB Connection
db.query('SHOW TABLES;')
    .then(([rows]) => {
        console.log('Database connected successfully! Tables:', rows);
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.message);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

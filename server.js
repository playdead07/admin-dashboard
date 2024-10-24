const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000; // One port for everything

// Database connections for schemes and user profiles (using two databases)
const schemePool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'soham', // Schemes database
    password: '3012',
    port: 5432,
});

const userPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'soham', // User profiles database
    password: '3012',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// --- SCHEMES SECTION ---

// Add Scheme
app.post('/schemes', async (req, res) => {
    const { name, description, caste, education, minIncome } = req.body;
    try {
        const result = await schemePool.query(
            'INSERT INTO schemes (name, description, caste, education, min_income) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, caste, education, minIncome]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding scheme:', error);
        res.status(500).send('Error adding scheme');
    }
});

// Remove Scheme
app.delete('/schemes/:id', async (req, res) => {
    try {
        const result = await schemePool.query('DELETE FROM schemes WHERE id = $1', [req.params.id]);
        result.rowCount > 0 ? res.status(204).send() : res.status(404).send('Scheme not found');
    } catch (error) {
        console.error('Error deleting scheme:', error);
        res.status(500).send('Error deleting scheme');
    }
});

// Get All Schemes
app.get('/schemes', async (req, res) => {
    try {
        const result = await schemePool.query('SELECT * FROM schemes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching schemes:', error);
        res.status(500).send('Error fetching schemes');
    }
});

// --- USER REGISTRATION/LOGIN SECTION ---

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await userPool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json({ message: 'Registration successful', user: result.rows[0] });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Registration failed');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username === 'admin' && password === 'admin') {
            res.status(200).json({ message: 'Admin login successful' });
        } else {
            const result = await userPool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
            if (result.rows.length > 0) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).send('Invalid user or password.');
            }
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

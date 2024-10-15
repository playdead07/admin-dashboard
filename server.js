const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'soham',
    password: '3012',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/schemes', async (req, res) => {
    const { name, description, startDate, endDate, caste, education } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO schemes (name, description, start_date, end_date, caste, education) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, description, startDate, endDate, caste, education]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error adding scheme');
    }
});

app.delete('/schemes/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM schemes WHERE id = $1', [req.params.id]);
        result.rowCount > 0 ? res.status(204).send() : res.status(404).send('Scheme not found');
    } catch (error) {
        res.status(500).send('Error deleting scheme');
    }
});

app.get('/schemes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM schemes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error fetching schemes');
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

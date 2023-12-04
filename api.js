const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 4000;

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Sxj42yvx",
    database: "favorit_cafes",
    connectionLimit: 10, // Adjust as needed
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

//cafes endpoints
app.get('/cafes', (req, res) => {
    pool.query('SELECT * FROM cafes', (error, results, fields) => {
        if (error) {
            console.error("Error retrieving cafes:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/cafes/:id', (req, res) => {
    const cafeId = req.params.id;
    pool.query('SELECT * FROM cafes WHERE cafe_id = ?', [cafeId], (error, results, fields) => {
        if (error) {
            console.error("Error retrieving cafe:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results[0]); // Assuming there's only one cafe with the given ID
        }
    });
});

app.post('/cafes', (req, res) => {
    const newCafe = req.body;
    pool.query('INSERT INTO cafes SET ?', [newCafe], (error, results, fields) => {
        if (error) {
            console.error("Error adding new cafe:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json({ success: true, message: "Cafe added successfully" });
        }
    });
});

// Users Endpoints
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error("Error retrieving users:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM users WHERE user_id = ?', [userId], (error, results, fields) => {
        if (error) {
            console.error("Error retrieving user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results[0]); // Assuming there's only one user with the given ID
        }
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    pool.query('INSERT INTO users SET ?', [newUser], (error, results, fields) => {
        if (error) {
            console.error("Error adding new user:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json({ success: true, message: "User added successfully" });
        }
    });
});

// Get all favorites
app.get('/favorites', (req, res) => {
    pool.query('SELECT favorites.*, cafes.cafe_name FROM favorites JOIN cafes ON favorites.cafe_id = cafes.cafe_id', (error, results, fields) => {
        if (error) {
            console.error("Error retrieving favorites:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json(results);
        }
    });
});

// Get favorites for a specific user
app.get('/users/:id/favorites', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT favorites.*, cafes.cafe_name FROM favorites JOIN cafes ON favorites.cafe_id = cafes.cafe_id WHERE favorites.user_id = ?', [userId], (error, results, fields) => {
        if (error) {
            console.error("Error retrieving favorites for user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(results);
        }
    });
});

app.post('/favorites', (req, res) => {
    const newFavorite = req.body;
    pool.query('INSERT INTO favorites SET ?', [newFavorite], (error, results, fields) => {
        if (error) {
            console.error("Error adding new favorite:", error);
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        } else {
            res.json({ success: true, message: "Favorite added successfully" });
        }
    });
});

// Similar modifications for users and favorites endpoints...
app.get('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
});

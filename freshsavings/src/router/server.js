const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'wad2-g7t2.c2ttwb5huwip.ap-southeast-1.rds.amazonaws.com',
  user: 'g7t2',
  password: 'wad2g7t2',
  database: ''
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/get_all_ingredients', (req, res) => {
  // Query the database to retrieve ingredients
  connection.query('SELECT * FROM freshsavings.Ingredient', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

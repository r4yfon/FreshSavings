require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mysql = require("mysql2");

// Enable CORS for all routes
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/get_all_ingredients", (req, res) => {
  // Query the database to retrieve ingredients
  connection.query("SELECT * FROM freshsavings.Ingredient", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});
app.get("/get_all_products", (req, res) => {
  // Query the database to retrieve ingredients
  connection.query(
    "select pid, Ingredient.iid, Ingredient.iname, selling_price, selling_quantity, fname, lname, said, posting_status, icat, Ingredient.price, image from freshsavings.Posting, freshsavings.Account, freshsavings.Ingredient where Posting.said = Account.aid and Posting.iid = Ingredient.iid",
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});
app.get("/get_product_description/:pid", (req, res) => {
  // Query the database to retrieve ingredients
  const pid = parseInt(req.params.pid);
  connection.query(
    "select Posting.pid, Ingredient.iid, expiring_in, selling_price, selling_quantity, fname, lname, address, iname, icat, price, image from freshsavings.Posting, freshsavings.Account, freshsavings.Ingredient where Posting.said = Account.aid and Posting.iid = Ingredient.iid and Posting.pid = ?",
    [pid],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

app.get("/get_all_ingredients_categories", (req, res) => {
  // Query the database to retrieve ingredients
  connection.query(
    "select iname, icat from freshsavings.Ingredient order by icat",
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

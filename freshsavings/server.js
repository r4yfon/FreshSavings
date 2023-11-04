require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const mysql = require("mysql2");
const bodyParser = require("body-parser");
const axios = require("axios");

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/login', Anyroute)
// app.use(express.json())
// app.use('/api', Anyroute)

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
    "select pid, Ingredient.iid, Ingredient.iname, selling_price, selling_quantity, fname, lname, said, Account.postalcode, Account.a_lat, Account.a_long, posting_status, icat, Ingredient.price, image from freshsavings.Posting, freshsavings.Account, freshsavings.Ingredient where Posting.said = Account.aid and Posting.iid = Ingredient.iid",
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
app.get("/get_address/:aid", (req, res) => {
  // Query the database to retrieve ingredients
  const aid = parseInt(req.params.aid);
  connection.query(
    "select postalcode, a_lat, a_long from freshsavings.Account where aid = ?",
    [aid],
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
    "select iid, iname, icat, img from freshsavings.Ingredient order by icat",
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

app.get("/get_all_recipes", (req, res) => {
  // Query the database to retrieve ingredients
  connection.query(
    "SELECT r.rid, ri.iid, rname, i.iname, r.rimg FROM freshsavings.RecipeIngredient ri, freshsavings.Recipe r, freshsavings.Ingredient i WHERE ri.rid = r.rid AND i.iid = ri.iid;",
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

app.get("/get_user_inventory_items", (req, res) => {
  const userid = 1; // aid of currently logged-in user
  connection.query(
    // TODO: make query more specific after finalising the data to fetch
    "SELECT * FROM freshsavings.AccountInventory WHERE aid = ?",
    [userid],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  connection.query(
    "SELECT * FROM freshsavings.Account WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (results.length > 0) {
        if (results[0].password === password) {
          // Login successful, return the user data
          res.json({ message: "Login successful", user: results[0] });
        } else {
          // Incorrect password, return an error message
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        // User not found, return an error message
        res.status(404).json({ error: "User not found" });
      }
    }
  );
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  // Check if the email and password are provided in the request
  if (!email) {
    errors.push("Email is required.");
  }

  // Check if the password is provided in the request
  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password should be at least 8 characters long.");
  }

  // Check if the email format is valid
  const emailFormat = /^\S+@\S+\.\S+$/;
  if (email && !email.match(emailFormat)) {
    errors.push("Invalid email format.");
  }

  // Return errors array if any errors are found
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Hardcode the postal code and retrieve its latitude and longitude
  connection.query(
    "SELECT * FROM freshsavings.Account WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ errors: ["Email already exists."] });
      }

      // Hardcode the postal code and retrieve its latitude and longitude
      const postalCode = "670641";
      const latitude = "1.38765766146094";
      const longitude = "103.76208975109";

      // Insert the new user record with the postal code and its coordinates
      connection.query(
        "INSERT INTO freshsavings.Account (email, password, postalcode, a_lat, a_long) VALUES (?, ?, ?, ?, ?)",
        [email, password, postalCode, latitude, longitude],
        (err, results) => {
          if (err) {
            console.error("Error inserting into the database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json({ message: "User created successfully." });
        }
      );
    }
  );
});

app.get('/get-distance', async (req, res) => {
  try {
    const originLat = req.query.originLat;
    const originLng = req.query.originLng;
    const destLat = req.query.destLat;
    const destLng = req.query.destLng;
    const units = req.query.units;
    const apiKey = req.query.apiKey;

    // Construct the API URL using latitude and longitude
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&units=${units}&key=${apiKey}`;

    // Make the API request to Google Maps
    const response = await axios.get(apiUrl);

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

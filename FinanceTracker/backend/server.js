const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 3000;
const saltRounds = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pradeep@00",
  database: "campus_cash",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log("Received data:", { firstName, lastName, email, password });

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("An error occurred while hashing the password");
    }

    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    db.query(query, [firstName, lastName, email, hashedPassword], (err, results) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.error("Duplicate entry:", err);
          return res.status(400).send("Email already registered");
        }
        console.error("Error inserting data into the database:", err);
        return res.status(500).send("An error occurred while inserting data into the database");
      }

      console.log("User registered successfully:", results);
      res.send("Registration successful");
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user from the database:", err);
      return res.status(500).send("An error occurred while fetching user from the database");
    }

    if (results.length === 0) {
      return res.status(400).send("Invalid credentials");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("An error occurred while comparing passwords");
      }

      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }

      res.send("Login successful");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

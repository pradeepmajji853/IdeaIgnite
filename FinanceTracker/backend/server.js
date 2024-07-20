const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const saltRounds = 10;
const secretKey = 'Pradeep@00';

const moment = require('moment');

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

      const user = { id: results.insertId, firstName, lastName, email };
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

      res.json({ message: "Registration successful", token, user });
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
      console.error("Error fetching user from database:", err);
      return res.status(500).send("An error occurred while fetching user from database");
    }

    if (results.length === 0) {
      return res.status(400).send("Invalid email or password");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("An error occurred while comparing passwords");
      }

      if (!isMatch) {
        return res.status(400).send("Invalid email or password");
      }

      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT id, first_name, last_name, email FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).send("An error occurred while fetching user data");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(results[0]);
  });
});

app.post('/savingswallet', (req, res) => {
  const { userId, type, amount, date } = req.body;
  const query = 'INSERT INTO savingswallet (user_id, type, amount, date) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, type, amount, date], (err, result) => {
    if (err) {
      console.error("Error adding transaction:", err);
      return res.status(500).send("An error occurred while adding transaction");
    }
    res.send('Transaction added to database');
  });
});

app.get('/savingswallet/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM savingswallet WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).send("An error occurred while fetching transactions");
    }
    res.json(results);
  });
});



app.post('/transactions', (req, res) => {
  const { userId, amount, description, category, date, type } = req.body;

  if (!userId || !amount || !description || !category || !date || !type) {
    return res.status(400).send("All fields are required");
  }

  const query = 'INSERT INTO transactions (user_id, amount, description, category, date, type) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [userId, amount, description, category, date, type], (err, result) => {
    if (err) {
      console.error("Error adding transaction:", err);
      return res.status(500).send("An error occurred while adding transaction");
    }
    res.status(201).send('Transaction added successfully');
  });
});


app.get('/transactions', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const query = 'SELECT * FROM transactions WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).send("An error occurred while fetching transactions");
    }
    res.json(results);
  });
});

app.get('/transactions/balance', (req, res) => {
  const userId = req.query.userId;

  const query = `
    SELECT 
      SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) -
      SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) AS balance 
    FROM transactions 
    WHERE user_id = ?
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching balance:", err);
      return res.status(500).send("An error occurred while fetching balance");
    }
    const balance = results[0].balance || 0; // Handle null balance
    res.json({ balance });
  });
});


app.post('/BankAccountdashboard', (req, res) => {
  const { userId, transactions } = req.body;

  if (!userId || !transactions || !Array.isArray(transactions)) {
    return res.status(400).send("Invalid input data");
  }

  for (const transaction of transactions) {
    const { date, amount, description, category, type } = transaction;
    if (!date || !amount || !description || !category || !type) {
      return res.status(400).send("Transaction data is incomplete");
    }
  }

  const query = 'INSERT INTO BAtransactions (user_id, date, amount, description, category, type) VALUES ?';
  const values = transactions.map(t => [
    userId,
    moment(t.date).format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
    t.amount,
    t.description,
    t.category,
    t.type
  ]);

  console.log("Inserting values:", values);

  db.query(query, [values], (err) => {
    if (err) {
      console.error("Error inserting transactions:", err);
      return res.status(500).send("An error occurred while inserting transactions");
    }
    res.send("Transactions inserted successfully");
  });
});

app.get('/BankAccountdashboard', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const query = 'SELECT * FROM BAtransactions WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).send("An error occurred while fetching transactions");
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

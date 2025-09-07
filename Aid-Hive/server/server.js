const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//  MySQL2 connection
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "aidhive04", 
    database: "Infs"
});

// Check connection
con.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
    });
// Step 1: Create Database if not exists
    con.query("CREATE DATABASE IF NOT EXISTS Infs", (err) => {
        if (err) throw err;
        console.log("Database ensured: Infs");

        // Step 2: Use the Database
        con.changeUser({ database: "Infs" }, (err) => {
            if (err) throw err;
            console.log("Using database: Infs");

            // Step 3: Create Tables if not exist
            const tables = [
                `CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL
                )`,

                `CREATE TABLE IF NOT EXISTS donors (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100),
                    number VARCHAR(20),
                    gender VARCHAR(10),
                    cnic VARCHAR(20),
                    dob DATE,
                    age INT,
                    address VARCHAR(255),
                    country VARCHAR(100),
                    province VARCHAR(100),
                    city VARCHAR(100),
                    bloodGroup VARCHAR(10)
                )`,

                `CREATE TABLE IF NOT EXISTS patients (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    email VARCHAR(100),
                    number VARCHAR(20),
                    gender VARCHAR(10),
                    cnic VARCHAR(20),
                    dob DATE,
                    age INT,
                    address VARCHAR(255),
                    country VARCHAR(100),
                    province VARCHAR(100),
                    city VARCHAR(100),
                    bloodGroup VARCHAR(10)
                )`,

                `CREATE TABLE IF NOT EXISTS workers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100),
                    city VARCHAR(100),
                    address VARCHAR(255),
                    phone VARCHAR(20),
                    status VARCHAR(50)
                )`
            ];

            tables.forEach((sql) => {
                con.query(sql, (err) => {
                    if (err) throw err;
                });
            });

            console.log("All required tables ensured.");
        });
    });

dotenv.config();

//Rate limiter to block brute-force login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { message: "Too many login attempts, try again later" }
});

// ---------------- USER REGISTER (with hashed password) ----------------
app.post("/register-user", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Username and password required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        con.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error registering user:", err);
                return res.status(500).send({ message: "Error registering user" });
            }
            res.send({ message: "User registered" });
        });
    } catch (err) {
        res.status(500).send({ message: "Error hashing password" });
    }
});

// ---------------- SECURE LOGIN (bcrypt + JWT) ----------------
app.post("/secure-login", loginLimiter, (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    con.query(sql, [username], async (err, result) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).send({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: "Invalid username or password" });
        }

        //Create JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        res.send({ message: "Secure login successful", token });
    });
});

// ---------------- Middleware for Protected Routes ----------------
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).send({ message: "Access Denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ message: "Invalid or expired token" });
        req.user = user;
        next();
    });
}





// ---------------- LOGIN ROUTE ----------------
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    con.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).send({ error: err.message });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "WRONG USERNAME OR PASSWORD!" });
        }
    });
});

// ---------------- DONOR REGISTER ROUTE ----------------
app.post("/register", (req, res) => {
    const { name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup } = req.body;

    const sql = `INSERT INTO donors 
    (name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    con.query(sql, [name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup],
        (err, result) => {
            if (err) {
                console.error("MySQL Insert Error:", err);
                return res.status(500).send({ message: "Error registering donor", error: err });
            }
            res.send({ message: "Donor registered successfully!" });
        }
    );
});

// Fetch all donors
app.get("/donors", (req, res) => {
    const sql = "SELECT * FROM donors";
    con.query(sql, (err, results) => {
        if (err) {
            console.error("MySQL Fetch Error:", err);
            return res.status(500).send({ message: "Error fetching donors", error: err });
        }
        res.send(results);
    });
});
// ---------------- PATIENT REGISTER ROUTE ----------------
app.post("/dregister", (req, res) => {
    const { name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup } = req.body;

    const sql = `INSERT INTO patients 
    (name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

    con.query(sql, [name, email, number, gender, cnic, dob, age, address, country, province, city, bloodGroup],
        (err, result) => {
            if (err) {
                console.error("MySQL Insert Error:", err);
                return res.status(500).send({ message: "Error registering patient", error: err });
            }
            res.send({ message: "Patient registered successfully!" });
        }
    );
});

// Fetch all recipients
app.get("/recipients", (req, res) => {
    const sql = "SELECT * FROM patients";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("MySQL Fetch Error:", err);
            return res.status(500).send({ message: "Error fetching recipients", error: err });
        }
        res.send(result);
    });
});

// ---------------- WORKERS REGISTER ROUTE ----------------
app.post("/addjzt", (req, res) => {
    const { name, city, address, phone, status } = req.body;

    // Step 1: Check if worker with same name + phone exists
    const checkSql = `SELECT * FROM workers WHERE name = ? AND phone = ?`;
    con.query(checkSql, [name, phone], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("MySQL Check Error (workers):", checkErr);
            return res.status(500).send({ message: "Error checking existing worker", error: checkErr });
        }

        if (checkResult.length > 0) {
            // return res.status(400).send({ message: "User already exists" });
            console.log("User already exists");
        }

        // Step 2: Insert new worker if not exists
        const insertSql = `INSERT INTO workers (name, city, address, phone, status) VALUES (?, ?, ?, ?, ?)`;
        con.query(insertSql, [name, city, address, phone, status], (insertErr, result) => {
            if (insertErr) {
                console.error("MySQL Insert Error (workers):", insertErr);
                return res.status(500).send({ message: "Error registering worker", error: insertErr });
            }

            res.send({ message: "Worker data saved successfully!" });
        });
    });
});



//Get all workers (for Jztworker3.js page)
app.get("/api/jzt", (req, res) => {
    const sql = "SELECT * FROM workers";

    con.query(sql, (err, results) => {
        if (err) {
            console.error("MySQL Fetch Error (workers):", err);
            return res.status(500).send({ message: "Error fetching workers", error: err });
        }
        res.json(results);
    });
});

// ---------------- DELETE WORKER ROUTE ----------------
app.post("/deletejzt", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: "Name is required to delete worker" });
    }

    const sql = "DELETE FROM workers WHERE name = ?";

    con.query(sql, [name], (err, result) => {
        if (err) {
            console.error("MySQL Delete Error (workers):", err);
            return res.status(500).send({ message: "Error deleting worker", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Worker not found" });
        }

        res.send({ message: `Worker '${name}' deleted successfully!` });
    });
});

// ---------------- START SERVER ----------------
app.listen(3001, () => {
    console.log("Backend server is running on port 3001");
});

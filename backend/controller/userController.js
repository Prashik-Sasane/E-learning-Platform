const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB } = require("../config/db");


const registerUser = (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

module.exports = {registerUser}


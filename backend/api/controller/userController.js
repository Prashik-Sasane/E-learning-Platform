const { getDB } = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  const db = getDB();

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Server error" });

    const query =
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)";

    db.query(query, [firstName, lastName, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      // ✅ Only one response
      return res.status(201).json({ message: "User registered successfully" });
    });
  });
};


module.exports = {registerUser};

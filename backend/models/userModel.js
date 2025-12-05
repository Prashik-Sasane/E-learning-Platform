const { getDB } = require("../config/db");

const User = {
 
  findByEmail: (email, callback) => {
    const db = getDB();
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      callback
    );
  },

  create: (firstName, lastName, email, hashedPassword, callback) => {
    const db = getDB();
    db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword],
      callback
    );
  }
};

module.exports = User;

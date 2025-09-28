const { getDB } = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    const db = getDB();
    db.query("SELECT * FROM users WHERE email = ?", [email], callback);
  },

  
  create: (email, hashedPassword, callback) => {
    const db = getDB();
    db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], callback);
  }
};

module.exports = User;
// models/Recommendation.js
const { getDB } = require("../../db");

const Recommendation = {
  // Save recommendations for a student
  create: (userId, recommendations, callback) => {
    const db = getDB();
    // Store recommendations as JSON
    db.query(
      "INSERT INTO recommendations (user_id, recommended_items) VALUES (?, ?)",
      [userId, JSON.stringify(recommendations)],
      callback
    );
    
  },

  // Get recommendations for a student
  findByUserId: (userId, callback) => {
    const db = getDB();
    db.query(
      "SELECT * FROM recommendations WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId],
      callback
    );
  },
};

module.exports = Recommendation;

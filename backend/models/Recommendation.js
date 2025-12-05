const { getDB } = require("../config/db");

const Recommendation = {
  /**
   * Create recommendations for a user
   */
  createForUser: (userId, recommendations, callback) => {
    const db = getDB();
    
    // First, delete existing recommendations for this user
    db.query("DELETE FROM recommendations WHERE user_id = ?", [userId], (deleteErr) => {
      if (deleteErr) {
        console.error("Error deleting old recommendations:", deleteErr);
        return callback(deleteErr);
      }

      // Insert new recommendations
      if (!recommendations || recommendations.length === 0) {
        return callback(null);
      }

      const values = recommendations.map((rec) => [
        userId,
        rec.title,
        rec.subtitle,
        rec.chapters,
        rec.items,
        rec.category,
        rec.locked ? 1 : 0,
        rec.bgGradient || "bg-gradient-to-r from-slate-800 to-slate-900",
      ]);

      const query = `
        INSERT INTO recommendations (user_id, title, subtitle, chapters, items, category, locked, bg_gradient)
        VALUES ?
      `;

      db.query(query, [values], callback);
    });
  },

  /**
   * Get recommendations for a user
   */
  getByUserId: (userId, callback) => {
    const db = getDB();
    const query = `
      SELECT 
        id,
        title,
        subtitle,
        chapters,
        items,
        category,
        locked,
        bg_gradient as bgGradient
      FROM recommendations
      WHERE user_id = ?
      ORDER BY id ASC
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        return callback(err);
      }

      // Convert locked (0/1) to boolean
      const recommendations = results.map((rec) => ({
        ...rec,
        locked: rec.locked === 1,
      }));

      callback(null, recommendations);
    });
  },
};

module.exports = Recommendation;

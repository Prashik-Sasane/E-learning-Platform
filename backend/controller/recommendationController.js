const Recommendation = require("../models/Recommendation");
const authMiddleware = require("../middleware/authMiddleware");

const getRecommendations = (req, res) => {
  const userId = req.user?.id || req.body.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  Recommendation.getByUserId(userId, (err, recommendations) => {
    if (err) {
      console.error("Error fetching recommendations:", err);
      return res.status(500).json({ error: "Failed to fetch recommendations" });
    }

    // If no personalized recommendations, return empty array
    // Frontend can fall back to default featured items
    res.status(200).json({ recommendations: recommendations || [] });
  });
};

module.exports = { getRecommendations };

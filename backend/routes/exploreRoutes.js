const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Recommendation = require("../models/Recommendation");
const { searchLearningResources, getTrendingTopics, getLearningInsights } = require("../services/webScrapingService");

const JWT_SECRET = process.env.JWT_SECRET;

// Static featured programs / topics for Explore page (fallback)
const featuredItems = [
  {
    id: 1,
    title: "AI-Powered Doubt Solving",
    subtitle: "Instant answers to academic questions",
    chapters: 5,
    items: 20,
    locked: false,
    category: "AI",
    bgGradient: "bg-gradient-to-r from-blue-400 to-purple-500",
  },
  {
    id: 2,
    title: "Personalized Study Plans",
    subtitle: "Tailored schedules for every student",
    chapters: 4,
    items: 15,
    locked: false,
    category: "Productivity",
    bgGradient: "bg-gradient-to-r from-green-400 to-teal-400",
  },
  {
    id: 3,
    title: "NCERT Learning Board",
    subtitle: "Structured curriculum aligned with NCERT",
    chapters: 6,
    items: 30,
    locked: true,
    category: "School",
    bgGradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
  },
  {
    id: 4,
    title: "Competitive Exam Prep",
    subtitle: "Smart practice for JEE, NEET, and more",
    chapters: 3,
    items: 25,
    locked: false,
    category: "Exams",
    bgGradient: "bg-gradient-to-r from-pink-400 to-red-400",
  },
];

// Optional auth middleware - doesn't fail if no token or invalid token
const optionalAuth = (req, res, next) => {
  const tokenFromCookie = req.cookies && req.cookies.token;
  const tokenFromHeader = req.header("Authorization")?.split(" ")[1];
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return next(); // Continue without user
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    // Invalid token, but continue without user
    req.user = null;
  }
  
  next();
};

// GET /api/explore/featured
// Returns personalized recommendations if user is authenticated, otherwise returns default featured items
router.get("/featured", optionalAuth, (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    // Not authenticated - return default featured items
    return res.json({ items: featuredItems });
  }

  // Fetch personalized recommendations
  Recommendation.getByUserId(userId, (err, recommendations) => {
    if (err) {
      console.error("Error fetching recommendations:", err);
      // Fallback to default items on error
      return res.json({ items: featuredItems });
    }

    // If user has personalized recommendations, return them
    // Otherwise return default featured items
    if (recommendations && recommendations.length > 0) {
      res.json({ items: recommendations });
    } else {
      res.json({ items: featuredItems });
    }
  });
});

// GET /api/explore/resources/:topic
// Fetch real-time learning resources for a specific topic
router.get("/resources/:topic", optionalAuth, async (req, res) => {
  try {
    const { topic } = req.params;
    const { subject, grade } = req.query;

    const resources = await searchLearningResources(
      topic,
      subject || topic,
      grade || "General"
    );

    res.json({ resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// GET /api/explore/trending
// Get trending topics in education
router.get("/trending", optionalAuth, async (req, res) => {
  try {
    const { subject } = req.query;
    const trending = await getTrendingTopics(subject || "General");

    res.json({ topics: trending });
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    res.status(500).json({ error: "Failed to fetch trending topics" });
  }
});

module.exports = router;



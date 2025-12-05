const express = require("express");
const router = express.Router();
const surveyController = require("../controller/surveyController");
const authMiddleware = require("../middleware/authMiddleware");

// AI-powered survey endpoint (triggered after signup)
router.post("/conduct", surveyController.conductSurvey);

// Interactive survey endpoints
router.post("/start", surveyController.startInteractiveSurvey);
router.post("/answer", surveyController.processAnswer);

// Get user's personalized recommendations
router.get("/recommendations", authMiddleware, surveyController.getUserRecommendations);

// Legacy manual survey submission (if needed)
router.post("/submit", (req, res) => {
  const Survey = require("../models/Survey");
  const { studentId, grade, interests, goals, studyHours, skillLevel } = req.body;

  Survey.create(
    studentId,
    grade,
    interests,
    goals,
    studyHours,
    skillLevel,
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({
        message: "Survey received successfully",
      });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");
const { getRecommendations } = require("../utils/recommendationEngine");

router.post("/submit", (req, res) => {
  try {
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

        const recommendations = getRecommendations({ grade, interests, goals, skillLevel });

        res.json({
          message: "Survey received successfully",
          recommendations
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

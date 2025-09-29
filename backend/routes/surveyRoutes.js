const express = require("express");
const router = express.Router();
const Survey = require("../models/Survey");

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


        res.json({
          message: "Survey received successfully",
          recommendations: [
            { title: "Algebra Basics", description: "Learn algebra fundamentals", image: "https://source.unsplash.com/400x200/?mathematics" },
            { title: "Newton’s Laws", description: "Physics basic concepts", image: "https://source.unsplash.com/400x200/?physics" }
          ]
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

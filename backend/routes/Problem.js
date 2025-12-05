const express = require("express");
const router = express.Router();
const { getDB } = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// Helper to get DB connection
const db = () => getDB();

// Get all problems (basic list for Problem.tsx)
router.get("/", (req, res) => {
  db().query(
    "SELECT id, title, category, difficulty, points FROM problems",
    (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    }
  );
});

// Get single problem with full details (e.g., for a detailed view / solving page)
router.get("/:id", (req, res) => {
  db().query(
    "SELECT * FROM problems WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Problem not found" });
      }
      res.json(results[0]);
    }
  );
});

// Submit answer for a problem (uses authenticated user from JWT cookie)
router.post("/submit/:problemId", authMiddleware, (req, res) => {
  const { problemId } = req.params;
  const { answer } = req.body;
  const userId = req.user.id;

  if (!answer) {
    return res.status(400).json({ error: "Answer is required" });
  }

  db().query(
    "SELECT * FROM problems WHERE id = ?",
    [problemId],
    (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Problem not found" });
      }

      const problem = results[0];

      if (problem.solution === answer) {
        // Check if already solved by this user
        db().query(
          "SELECT * FROM user_solved_problems WHERE user_id = ? AND problem_id = ?",
          [userId, problemId],
          (checkErr, solvedRows) => {
            if (checkErr) {
              console.error("Database error:", checkErr.message);
              return res.status(500).json({ error: "Database error" });
            }

            if (solvedRows.length === 0) {
              db().query(
                "INSERT INTO user_solved_problems (user_id, problem_id) VALUES (?, ?)",
                [userId, problemId],
                (insertErr) => {
                  if (insertErr) {
                    console.error("Insert error:", insertErr.message);
                    // still return success about correctness
                  }
                }
              );
              // Optional: if you have a points column in users, uncomment this
              // db().query(
              //   "UPDATE users SET points = points + ? WHERE id = ?",
              //   [problem.points || 0, userId],
              //   () => {}
              // );
            }

            return res.json({
              result: "Correct",
              points: problem.points || 0,
            });
          }
        );
      } else {
        return res.json({ result: "Incorrect. Try again!" });
      }
    }
  );
});

module.exports = router;

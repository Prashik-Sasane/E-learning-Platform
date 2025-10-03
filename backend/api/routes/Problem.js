const express = require("express");
const router = express.Router();
const db = require("../config/db"); // mysql2 pool
// Get all problems
router.get("/", async (req, res) => {
    const [problems] = await db.query("SELECT id, title, category, difficulty, points FROM problems");
    res.json(problems);
});


// Get single problem
router.get("/:id", async (req, res) => {
    const [problems] = await db.query("SELECT * FROM problems WHERE id = ?", [req.params.id]);
    if (problems.length === 0) return res.status(404).json({ error: "Problem not found" });
    res.json(problems[0]);
});

// Submit answer
router.post("/submit/:userId/:problemId", async (req, res) => {
    const { userId, problemId } = req.params;
    const { answer } = req.body;

    const [problems] = await db.query("SELECT * FROM problems WHERE id = ?", [problemId]);
    if (problems.length === 0) return res.status(404).json({ error: "Problem not found" });

    const problem = problems[0];

    // Check if answer is correct
    if (problem.solution === answer) {
        // Check if already solved
        const [solved] = await db.query(
            "SELECT * FROM user_solved_problems WHERE user_id = ? AND problem_id = ?",
            [userId, problemId]
        );

        if (solved.length === 0) {
            await db.query("INSERT INTO user_solved_problems(user_id, problem_id) VALUES (?, ?)", [userId, problemId]);
            await db.query("UPDATE users SET points = points + ? WHERE id = ?", [problem.points, userId]);
        }

        res.json({ result: "Correct", points: problem.points });
    } else {
        res.json({ result: "Incorrect. Try again!" });
    }
});

module.exports = router;

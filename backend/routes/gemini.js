const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;

console.log("Gemini key in router:", apiKey ? "YES" : "NO");
if (!apiKey) {
  console.warn(
    "GEMINI_API_KEY is not set. Gemini endpoints will not work until configured in .env."
  );
}

// Create Gemini Client
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
    })
  : null;

/* ============================================================
   POST /api/doubts/ask
   Feature-specific AI endpoint
   ============================================================ */
router.post("/ask", async (req, res) => {
  try {
    const { prompt, feature, language } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!ai) {
      return res
        .status(500)
        .json({ error: "Gemini not configured (missing API key)" });
    }

    // Adjust prompt based on feature
    let finalPrompt = "";

    switch (feature) {
      case "Productivity":
        finalPrompt = `Create a study planner for: ${prompt} in table format with subjects, days, and hours. Plain text only, no markdown or bold. Keep answers simple, direct, and clear.`;
        break;

      case "SmartLearning":
        finalPrompt = `Provide 5-7 AI-generated educational video suggestions for: ${prompt}. Include video titles and links only. Do not use markdown symbols like **, ##, *, etc. Keep answers simple, direct, and clear.`;
        break;

      case "CompetitivePrep":
        finalPrompt = `Create a detailed roadmap for: ${prompt} suitable for a competitive exam. List topics, order, and timeline. Format it as plain text for PPT/PDF creation. Do not use markdown symbols like **, ##, *, etc. Keep answers simple, direct, and clear.`;
        break;

      case "CareerGrowth":
        finalPrompt = `Provide a clear career growth plan for: ${prompt}. Include steps, skills, and timelines. Plain, clear text only. Do not use markdown symbols like **, ##, *, etc. Keep answers simple, direct, and clear.`;
        break;

      case "MultiLanguageLearning":
        finalPrompt = `Explain this concept in ${language || "English"}: ${prompt}. No markdown or bold formatting. Keep it simple and clear. Do not use markdown symbols like **, ##, *, etc. Keep answers simple, direct, and clear.`;
        break;

      default:
        finalPrompt = `Answer this question: ${prompt} in simple, clear language without markdown, bold, or extra formatting. Do not use markdown symbols like **, ##, *, etc. Keep answers simple, direct, and clear.`;
        break;
    }

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini /ask Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

/* ============================================================
   POST /api/doubts/solve-problem
   Problem-solving AI endpoint
   ============================================================ */
router.post("/solve-problem", async (req, res) => {
  try {
    const { question, userAnswer } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!ai) {
      return res
        .status(500)
        .json({ error: "Gemini not configured (missing API key)" });
    }

    const prompt = `
      You are a helpful tutor on an e-learning platform.
      - Do not use bold formatting.
      - Do not use markdown symbols like **, ##, *, etc.
      - Keep answers simple, direct, and clear.
      - No long introductions, no extra questions unless necessary.

      Question: ${question}
      ${userAnswer ? `Student's answer: ${userAnswer}` : ""}

      Your tasks:
      1. First state whether the student's answer is correct (if provided).
      2. Then provide a step-by-step explanation.
      3. Give improvements and clear guidance.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini /solve-problem Error:", error);
    res.status(500).json({ error: "Failed to solve problem" });
  }
});

module.exports = router;

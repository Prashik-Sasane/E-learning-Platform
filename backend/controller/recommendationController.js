const Recommendation = require("../models/Recommendation");

const getRecommendations = (req, res) => {
  const { userId } = req.body;

  // Here you will call your ML logic (can be Python script, or Node ML lib)
  // For now, returning a mock response
  const recommendedProblems = [
    { title: "Quadratic Equations Practice", subject: "Maths", difficulty: "Easy" },
    { title: "Newton's Laws MCQ", subject: "Physics", difficulty: "Medium" },
  ];

  res.status(200).json({ recommendations: recommendedProblems });
};

module.exports = { getRecommendations };

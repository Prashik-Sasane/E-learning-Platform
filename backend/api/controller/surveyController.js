const Survey = require("../../../models/Survey");

// Placeholder ML function (replace with real model)
const generateRecommendations = (interests) => {
  return interests.map(subject => ({
    title: `${subject} Basics`,
    description: `Recommended ${subject} topics based on your survey.`,
    image: `https://source.unsplash.com/400x200/?${subject.replace(" ", "")}`
  }));
};

exports.submitSurvey = (req, res) => {
  const { studentId, grade, interests, goals, skillLevel, studyHours } = req.body;

  Survey.create(studentId, grade, interests, goals, skillLevel, studyHours, (err) => {
    if(err) return res.status(500).json({ error: "Database error" });

    const recommendations = generateRecommendations(interests);
    res.json({ message: "Survey submitted successfully", recommendations });
  });
};

const Survey = require("../models/Survey");
const Recommendation = require("../models/Recommendation");
const { 
  conductAISurvey, 
  analyzeSurveyAndRecommend,
  startInteractiveSurvey,
  processSurveyAnswer 
} = require("../services/aiSurveyService");

/**
 * Conducts AI survey for a new user after signup
 */
exports.conductSurvey = async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;

    if (!userId || !firstName || !email) {
      return res.status(400).json({ error: "User information required" });
    }

    // Conduct AI survey
    const surveyData = await conductAISurvey({ firstName, lastName, email });

    // Save survey to database
    Survey.create(
      userId,
      surveyData.grade,
      surveyData.interests,
      surveyData.goals,
      surveyData.studyHours,
      surveyData.skillLevel,
      async (err, result) => {
        if (err) {
          console.error("Database error saving survey:", err);
          return res.status(500).json({ error: "Failed to save survey" });
        }

        // Analyze survey and generate recommendations
        try {
          const recommendations = await analyzeSurveyAndRecommend(surveyData);

          // Save recommendations to database
          Recommendation.createForUser(userId, recommendations, (recErr) => {
            if (recErr) {
              console.error("Error saving recommendations:", recErr);
              // Still return recommendations even if save fails
            }

            res.json({
              message: "Survey completed and analyzed successfully",
              survey: surveyData,
              recommendations,
            });
          });
        } catch (analysisError) {
          console.error("Error analyzing survey:", analysisError);
          // Return survey data even if analysis fails
          res.json({
            message: "Survey completed successfully",
            survey: surveyData,
            recommendations: [],
          });
        }
      }
    );
  } catch (error) {
    console.error("Survey error:", error);
    res.status(500).json({ error: "Failed to conduct survey" });
  }
};

/**
 * Get user's recommendations
 */
exports.getUserRecommendations = (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    Recommendation.getByUserId(userId, (err, recommendations) => {
      if (err) {
        console.error("Error fetching recommendations:", err);
        return res.status(500).json({ error: "Failed to fetch recommendations" });
      }

      res.json({ recommendations: recommendations || [] });
    });
  } catch (error) {
    console.error("Get recommendations error:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};

/**
 * Start interactive survey - returns first question
 */
exports.startInteractiveSurvey = async (req, res) => {
  try {
    const { userId, firstName, lastName, email } = req.body;

    if (!userId || !firstName || !email) {
      return res.status(400).json({ error: "User information required" });
    }

    const firstQuestion = await startInteractiveSurvey({ firstName, lastName, email });

    res.json({
      question: firstQuestion,
      sessionId: `survey_${userId}_${Date.now()}`,
    });
  } catch (error) {
    console.error("Error starting interactive survey:", error);
    res.status(500).json({ error: "Failed to start survey" });
  }
};

/**
 * Process answer and get next question or complete survey
 */
exports.processAnswer = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, conversationHistory, answer } = req.body;

    if (!userId || !answer) {
      return res.status(400).json({ error: "User ID and answer required" });
    }

    const result = await processSurveyAnswer(
      { firstName, lastName, email },
      conversationHistory || [],
      answer
    );

    if (result.completed) {
      // Survey is complete, save to database
      const surveyData = result.surveyData;

      Survey.create(
        userId,
        surveyData.grade,
        surveyData.interests,
        surveyData.goals,
        surveyData.studyHours,
        surveyData.skillLevel,
        async (err) => {
          if (err) {
            console.error("Error saving survey:", err);
            return res.status(500).json({ error: "Failed to save survey" });
          }

          // Generate recommendations
          try {
            const recommendations = await analyzeSurveyAndRecommend(surveyData);

            Recommendation.createForUser(userId, recommendations, (recErr) => {
              if (recErr) {
                console.error("Error saving recommendations:", recErr);
              }

              res.json({
                completed: true,
                surveyData,
                recommendations,
                message: "Survey completed successfully!",
              });
            });
          } catch (analysisError) {
            console.error("Error analyzing survey:", analysisError);
            res.json({
              completed: true,
              surveyData,
              recommendations: [],
              message: "Survey completed successfully!",
            });
          }
        }
      );
    } else {
      // Continue with next question
      res.json({
        completed: false,
        question: result.question,
      });
    }
  } catch (error) {
    console.error("Error processing answer:", error);
    res.status(500).json({ error: "Failed to process answer" });
  }
};

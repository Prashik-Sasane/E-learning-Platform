const { GoogleGenAI } = require("@google/genai");
const { searchLearningResources, getTrendingTopics, getLearningInsights } = require("./webScrapingService");

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Conducts an AI-powered survey using Gemini
 * Returns structured survey data based on user responses
 */
const conductAISurvey = async (userInfo) => {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const { firstName, lastName, email } = userInfo;

  const surveyPrompt = `
You are an AI educational assistant conducting a personalized learning survey for a new student.

Student Information:
- Name: ${firstName} ${lastName}
- Email: ${email}

Conduct a brief, friendly survey to understand:
1. Grade/Class level (e.g., "10th", "12th", "College", "Graduate")
2. Subjects/Interests (list 3-5 subjects they're interested in, e.g., ["Math", "Physics", "Computer Science"])
3. Learning Goals (list 2-4 goals, e.g., ["Exam Preparation", "Skill Development", "Career Growth"])
4. Study Hours per week (a number, e.g., 10, 15, 20)
5. Skill Level (one of: "Beginner", "Intermediate", "Advanced")

Based on the student's name and email context, infer reasonable answers if needed, but make them realistic and diverse.

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks, no explanations):
{
  "grade": "12th",
  "interests": ["Physics", "Mathematics", "Computer Science"],
  "goals": ["JEE Preparation", "Skill Development"],
  "studyHours": 15,
  "skillLevel": "Intermediate"
}

Make sure the JSON is valid and complete.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: surveyPrompt,
    });

    const responseText = response.text.trim();
    
    // Clean the response - remove markdown code blocks if present
    let jsonText = responseText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const surveyData = JSON.parse(jsonText);

    // Validate and ensure all required fields
    return {
      grade: surveyData.grade || "Not specified",
      interests: Array.isArray(surveyData.interests) ? surveyData.interests : [],
      goals: Array.isArray(surveyData.goals) ? surveyData.goals : [],
      studyHours: parseInt(surveyData.studyHours) || 10,
      skillLevel: surveyData.skillLevel || "Beginner",
    };
  } catch (error) {
    console.error("AI Survey Error:", error);
    // Return default survey data if AI fails
    return {
      grade: "Not specified",
      interests: ["General Studies"],
      goals: ["Skill Development"],
      studyHours: 10,
      skillLevel: "Beginner",
    };
  }
};

/**
 * Analyzes survey responses and generates personalized recommendations with real-time resources
 */
const analyzeSurveyAndRecommend = async (surveyData) => {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const { grade, interests, goals, studyHours, skillLevel } = surveyData;

  // Fetch real-time learning resources using web scraping
  const primaryInterest = interests[0] || "General Studies";
  let realTimeResources = [];
  let trendingTopics = [];

  try {
    realTimeResources = await searchLearningResources(primaryInterest, primaryInterest, grade);
    trendingTopics = await getTrendingTopics(primaryInterest);
  } catch (error) {
    console.error("Error fetching real-time resources:", error);
  }

  const resourcesInfo = realTimeResources.length > 0 
    ? `\n\nReal-time resources found: ${realTimeResources.length} learning resources available for ${primaryInterest}.`
    : "";

  const analysisPrompt = `
You are an AI educational advisor. Analyze this student's survey responses and generate personalized learning recommendations with real-time learning resources.

Student Profile:
- Grade: ${grade}
- Interests: ${interests.join(", ")}
- Goals: ${goals.join(", ")}
- Study Hours/Week: ${studyHours}
- Skill Level: ${skillLevel}
${resourcesInfo}

Generate 4-6 personalized learning recommendations. Each recommendation should have:
- title: A catchy, specific title (e.g., "JEE Physics Mastery", "Python Programming Basics")
- subtitle: A brief description that mentions real-time learning and current resources (e.g., "Master physics concepts with live tutorials and practice problems")
- chapters: A number (3-8)
- items: A number (10-30) - make this reflect real available content
- category: One of: "AI", "Productivity", "School", "Exams", "Career", "Skills"
- locked: false (all recommendations should be unlocked for new users)
- resources: Include mention of real-time learning, web resources, and interactive content

Return ONLY a valid JSON array in this exact format (no markdown, no code blocks):
[
  {
    "title": "Example Course 1",
    "subtitle": "Description with real-time learning features",
    "chapters": 5,
    "items": 20,
    "category": "Exams",
    "locked": false
  }
]

Make recommendations relevant to their interests, goals, and skill level. Emphasize real-time learning, interactive content, and web-based resources.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: analysisPrompt,
    });

    const responseText = response.text.trim();
    
    // Clean the response
    let jsonText = responseText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const recommendations = JSON.parse(jsonText);

    // Validate and ensure it's an array
    if (!Array.isArray(recommendations)) {
      throw new Error("Invalid recommendations format");
    }

    // Enhance recommendations with real-time resources
    const enhancedRecommendations = await Promise.all(
      recommendations.map(async (rec, idx) => {
        const topic = rec.title.split(" ")[0] || primaryInterest;
        
        // Get resources for this specific recommendation
        let recResources = [];
        try {
          recResources = await searchLearningResources(topic, primaryInterest, grade);
        } catch (error) {
          console.error(`Error fetching resources for ${topic}:`, error);
        }

        // Get learning insights
        let insights = {};
        try {
          insights = await getLearningInsights(topic, grade);
        } catch (error) {
          console.error(`Error getting insights for ${topic}:`, error);
        }

        return {
          id: idx + 1,
          title: rec.title || "Learning Path",
          subtitle: rec.subtitle || "Personalized learning content with real-time resources",
          chapters: rec.chapters || 5,
          items: rec.items || 15,
          category: rec.category || "General",
          locked: rec.locked !== undefined ? rec.locked : false,
          bgGradient: getGradientByCategory(rec.category || "General"),
          // Add real-time learning features
          realTimeLearning: true,
          resources: recResources.slice(0, 3), // Include top 3 resources
          insights: insights,
          trendingTopics: trendingTopics.slice(0, 2), // Include 2 trending topics
        };
      })
    );

    return enhancedRecommendations;
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    // Return default recommendations with real-time features
    return await getDefaultRecommendationsWithResources(interests, goals, grade);
  }
};

// Helper function to assign gradient colors by category
const getGradientByCategory = (category) => {
  const gradients = {
    AI: "bg-gradient-to-r from-blue-400 to-purple-500",
    Productivity: "bg-gradient-to-r from-green-400 to-teal-400",
    School: "bg-gradient-to-r from-yellow-400 to-orange-400",
    Exams: "bg-gradient-to-r from-pink-400 to-red-400",
    Career: "bg-gradient-to-r from-indigo-400 to-blue-500",
    Skills: "bg-gradient-to-r from-cyan-400 to-blue-400",
    General: "bg-gradient-to-r from-slate-800 to-slate-900",
  };
  return gradients[category] || gradients.General;
};

// Fallback recommendations with real-time resources if AI fails
const getDefaultRecommendationsWithResources = async (interests, goals, grade) => {
  const recs = [
    {
      id: 1,
      title: "Personalized Study Plan",
      subtitle: "Tailored to your learning goals with real-time tracking",
      chapters: 4,
      items: 15,
      category: "Productivity",
      locked: false,
      bgGradient: "bg-gradient-to-r from-green-400 to-teal-400",
      realTimeLearning: true,
      resources: [],
      insights: {},
      trendingTopics: [],
    },
  ];

  const primaryInterest = interests[0] || "General Studies";
  
  // Try to get real resources
  try {
    const resources = await searchLearningResources(primaryInterest, primaryInterest, grade);
    recs[0].resources = resources.slice(0, 3);
  } catch (error) {
    console.error("Error in fallback resources:", error);
  }

  if (interests.includes("Physics") || interests.includes("Math") || primaryInterest.toLowerCase().includes("physics") || primaryInterest.toLowerCase().includes("math")) {
    recs.push({
      id: 2,
      title: "Physics & Math Fundamentals",
      subtitle: "Master core concepts with interactive tutorials",
      chapters: 6,
      items: 25,
      category: "School",
      locked: false,
      bgGradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
      realTimeLearning: true,
      resources: [],
      insights: {},
      trendingTopics: [],
    });
  }

  if (goals.some((g) => g.toLowerCase().includes("exam") || g.toLowerCase().includes("jee") || g.toLowerCase().includes("neet"))) {
    recs.push({
      id: 3,
      title: "Competitive Exam Prep",
      subtitle: "Smart practice with real-time mock tests",
      chapters: 5,
      items: 30,
      category: "Exams",
      locked: false,
      bgGradient: "bg-gradient-to-r from-pink-400 to-red-400",
      realTimeLearning: true,
      resources: [],
      insights: {},
      trendingTopics: [],
    });
  }

  return recs;
};

/**
 * Starts an interactive survey session
 * Returns the first question to ask the user
 */
const startInteractiveSurvey = async (userInfo) => {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const { firstName, lastName, email } = userInfo;

  const systemPrompt = `
You are a friendly AI educational assistant conducting a personalized learning survey. 
Your goal is to understand the student's learning preferences through a natural conversation.

Student Information:
- Name: ${firstName} ${lastName}
- Email: ${email}

You need to ask questions to understand:
1. Grade/Class level
2. Subjects/Interests (3-5 subjects)
3. Learning Goals (2-4 goals)
4. Study Hours per week
5. Skill Level (Beginner/Intermediate/Advanced)

Start by asking the FIRST question in a friendly, conversational way. Keep questions short and engaging.
Return ONLY the question text, nothing else. No markdown, no explanations, just the question.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    const question = response.text.trim();
    return question;
  } catch (error) {
    console.error("Error generating first question:", error);
    return "Hi! Welcome to our learning platform. What grade or class are you currently in?";
  }
};

/**
 * Processes user answer and generates next question or finalizes survey
 */
const processSurveyAnswer = async (userInfo, conversationHistory, userAnswer) => {
  if (!ai) {
    throw new Error("Gemini API key not configured");
  }

  const { firstName, lastName } = userInfo;

  // Build conversation context
  let conversationContext = `You are conducting a learning survey for ${firstName} ${lastName}.\n\n`;
  
  conversationHistory.forEach((msg, idx) => {
    if (msg.role === "ai") {
      conversationContext += `AI: ${msg.text}\n`;
    } else {
      conversationContext += `Student: ${msg.text}\n`;
    }
  });
  
  conversationContext += `Student: ${userAnswer}\n\n`;

  const prompt = `${conversationContext}
Based on the conversation so far, determine:
1. If you have gathered enough information to create a complete profile (grade, interests, goals, study hours, skill level)
2. If yes, return a JSON object with the survey data in this exact format:
{
  "completed": true,
  "surveyData": {
    "grade": "12th",
    "interests": ["Physics", "Math"],
    "goals": ["JEE Preparation"],
    "studyHours": 15,
    "skillLevel": "Intermediate"
  }
}

3. If no, ask the NEXT question to gather more information. Return:
{
  "completed": false,
  "question": "Your next question here"
}

Return ONLY valid JSON, no markdown, no code blocks, no explanations.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text.trim();
    
    // Clean the response
    let jsonText = responseText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const result = JSON.parse(jsonText);

    if (result.completed && result.surveyData) {
      // Validate and ensure all required fields
      return {
        completed: true,
        surveyData: {
          grade: result.surveyData.grade || "Not specified",
          interests: Array.isArray(result.surveyData.interests) ? result.surveyData.interests : [],
          goals: Array.isArray(result.surveyData.goals) ? result.surveyData.goals : [],
          studyHours: parseInt(result.surveyData.studyHours) || 10,
          skillLevel: result.surveyData.skillLevel || "Beginner",
        },
      };
    } else {
      return {
        completed: false,
        question: result.question || "What subjects are you most interested in learning?",
      };
    }
  } catch (error) {
    console.error("Error processing survey answer:", error);
    // Return a fallback question if processing fails
    return {
      completed: false,
      question: "That's helpful! What are your main learning goals?",
    };
  }
};

module.exports = {
  conductAISurvey,
  analyzeSurveyAndRecommend,
  startInteractiveSurvey,
  processSurveyAnswer,
};


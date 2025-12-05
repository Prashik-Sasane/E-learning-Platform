function getRecommendations({ grade, interests, goals, skillLevel }) {
  const recs = [];

  // Example rules (can later be replaced with ML)
  if (interests.includes("Physics")) {
    recs.push({
      title: "Newton’s Laws",
      description: "Physics basics explained with examples",
      image: "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/3e534993-b6af-4cfe-87e0-7635088bdc61"
    });
  }

  if (interests.includes("AI / ML")) {
    recs.push({
      title: "Intro to Machine Learning",
      description: "Beginner-friendly ML concepts",
      image: "https://tdwi.org/-/media/TDWI/TDWI/BITW/machinelearning1.jpg"
    });
  }

  if (goals.includes("Interview Prep")) {
    recs.push({
      title: "DSA Problem Solving",
      description: "Crack coding interviews with DSA",
      image: "https://miro.medium.com/0*RgDby7Ef-IjxXtFX"
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: "General Study Plan",
      description: "Time management & study tips",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    });
  }

  return recs;
}

module.exports = { getRecommendations };

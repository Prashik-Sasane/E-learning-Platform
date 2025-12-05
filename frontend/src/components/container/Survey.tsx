// src/Survey.tsx
import React, { useState } from "react";

interface Recommendation {
  title: string;
  description: string;
  image: string;
}

const Survey: React.FC = () => {
  const [page, setPage] = useState<"survey" | "explore">("survey");

  // Survey state
  const [studentId] = useState<string>("1"); // TODO: replace with login-based ID
  const [grade, setGrade] = useState<string>("6th - 8th Grade");
  const [goals, setGoals] = useState<string>("Exam Preparation");
  const [studyHours, setStudyHours] = useState<number>(2);
  const [skillLevel, setSkillLevel] = useState<string>("Beginner");
  const [interests, setInterests] = useState<string[]>([]);

  // Recommendations from backend
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (subject: string) => {
    setInterests((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          grade,
          goals,
          studyHours,
          skillLevel,
          interests,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();

      setRecommendations(
        (data.recommendations || []).map((r: any) => ({
          title: r.title,
          description: `${r.category || ""} - ${r.difficulty || ""}`,
          image:
            r.image ||
            `https://source.unsplash.com/400x200/?${r.category || "education"}`,
        }))
      );

      setPage("explore");
    } catch (err: any) {
      console.error("Error submitting survey:", err);
      setError("Failed to submit survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subjects = [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "AI / ML",
    "Web Development",
    "Law Study",
    "Mbbs Study",
    "CyberHacker",
    "UI / UX designer",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {page === "survey" ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Student Survey</h1>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSurveySubmit} className="space-y-4">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium mb-1">🎓 Your Education Level</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option>6th - 8th Grade</option>
                <option>9th - 10th Grade</option>
                <option>11th - 12th Grade</option>
                <option>Undergraduate (B.Tech, B.Sc, etc.)</option>
                <option>Graduate (M.Tech, M.Sc, PhD)</option>
              </select>
            </div>

            {/* Learning Goals */}
            <div>
              <label className="block text-sm font-medium mb-1">🎯 Learning Goal</label>
              <select
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option>Exam Preparation</option>
                <option>Skill Building</option>
                <option>Interview Prep</option>
                <option>Research / Higher Studies</option>
              </select>
            </div>

            {/* Interested Subjects */}
            <div>
              <label className="block text-sm font-medium mb-1">📚 Interested Subjects</label>
              <div className="flex gap-2 flex-wrap">
                {subjects.map((subject) => (
                  <label key={subject} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={interests.includes(subject)}
                      onChange={() => toggleInterest(subject)}
                    />
                    {subject}
                  </label>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium mb-1">📊 Current Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Daily Study Hours */}
            <div>
              <label className="block text-sm font-medium mb-1">⏳ Daily Study Hours</label>
              <input
                type="number"
                value={studyHours}
                onChange={(e) => setStudyHours(parseInt(e.target.value))}
                className="w-full border rounded-lg p-2"
                placeholder="e.g. 2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit & Continue"}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-4">✨ Your Explore Page</h1>
          <p className="text-gray-600 mb-6">Based on your survey, here are some recommended topics:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow">
                  <img src={rec.image} alt={rec.title} className="rounded-lg mb-4" />
                  <h2 className="text-xl font-semibold">{rec.title}</h2>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;

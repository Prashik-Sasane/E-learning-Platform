import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

const API_URL = "http://localhost:5000/api";

const SmartLearning: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const features = [
    {
      title: "Interactive Video Lessons",
      description:
        "Engaging video lessons that make learning fun, easy, and effective.",
      type: "videos",
    },
    {
      title: "Offline Downloads",
      description:
        "Download your lessons and learn anytime, anywhere — even without the internet.",
      type: "downloads",
    },
    {
      title: "Smart Quizzes",
      description:
        "Test your understanding with adaptive quizzes that match your learning speed.",
      type: "quizzes",
    },
    {
      title: "Progress Tracking",
      description:
        "Track your daily learning progress and identify areas for improvement.",
      type: "progress",
    },
    {
      title: "AI Tutor (24/7)",
      description:
        "Ask questions, clear doubts, and get step-by-step explanations — available in multiple languages.",
      type: "ai",
    },
  ];

  const handleFeatureClick = (feature: string) => {
    setActiveFeature(feature);
    setShowPopup(true);
    setAiAnswer(null);
  };

  const handleAskAI = async () => {
  if (!aiQuestion.trim()) return;
  setLoading(true);
  setAiAnswer(null);
  try {
    const res = await fetch(`${API_URL}/doubts/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: aiQuestion,
        feature: "SmartLearning", // tells backend it's for SmartLearning page
        activeFeature,             // pass current selected feature (e.g., "videos", "ai")
        language: "English",       // optionally add a selected language
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setAiAnswer(data.error || "Failed to get AI response");
    } else {
      setAiAnswer(data.text || "No answer from AI.");
    }
  } catch (err) {
    console.error(err);
    setAiAnswer("Something went wrong while contacting AI.");
  } finally {
    setLoading(false);
  }
};

  const renderPopupContent = () => {
    switch (activeFeature) {
      case "downloads":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Offline Downloads
            </h2>
            <p className="text-gray-300 mb-6">
              Access your downloaded lessons anytime — even without the internet.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-gray-800/70 border border-gray-700 rounded-2xl p-2 cursor-pointer hover:scale-105 transition-all"
                >
                  <div className="w-full h-28 bg-gradient-to-br from-gray-700 to-black rounded-2xl mb-2 flex items-center justify-center text-gray-400">
                    🎬 Video {num}
                  </div>
                  <p className="text-sm text-gray-300 text-center">Lesson {num}</p>
                </div>
              ))}
            </div>
          </>
        );

      case "videos":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Interactive Video Lessons
            </h2>
            <p className="text-gray-300 mb-6">
              Explore engaging video lessons designed for better understanding.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-gray-800/70 border border-gray-700 rounded-2xl p-2 hover:scale-105 transition-all"
                >
                  <div className="w-full h-28 bg-gradient-to-br from-gray-700 to-black rounded-2xl flex items-center justify-center text-gray-400">
                    ▶️ Lesson {num}
                  </div>
                  <p className="text-sm text-gray-300 text-center">
                    Topic {num}
                  </p>
                </div>
              ))}
            </div>
          </>
        );

      case "quizzes":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Smart Quizzes
            </h2>
            <p className="text-gray-300 mb-6">
              Challenge yourself with adaptive quizzes that suit your learning speed.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Math", "Science", "History", "English"].map((subject, i) => (
                <div
                  key={i}
                  className="bg-gray-800/70 border border-gray-700 rounded-2xl p-4 text-center text-gray-300 hover:scale-105 transition-all cursor-pointer"
                >
                  🧠 {subject} Quiz
                </div>
              ))}
            </div>
          </>
        );

      case "progress":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Progress Tracking
            </h2>
            <p className="text-gray-300 mb-6">
              See your growth and achievements at a glance.
            </p>
            <div className="space-y-3">
              {["Mathematics", "Physics", "History", "English"].map((subject, i) => (
                <div
                  key={i}
                  className="bg-gray-800/70 border border-gray-700 rounded-2xl p-4"
                >
                  <p className="text-gray-300">{subject}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${50 + i * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case "ai":
        return (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              AI Tutor (24/7)
            </h2>
            <p className="text-gray-300 mb-6">
              Get instant explanations and answers from your personal AI tutor.
            </p>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows={4}
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="Ask any question or describe what you want to learn..."
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-3xl text-white transition-all disabled:opacity-60"
            >
              {loading ? "Asking..." : "Ask AI"}
            </button>
            {aiAnswer && (
              <div className="mt-4 p-3 rounded-2xl bg-gray-800 text-sm whitespace-pre-wrap max-h-56 overflow-auto text-left">
                {aiAnswer}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black/80 relative bg-cover bg-center px-4 py-10 rounded-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-3">Smarter Way to Learn</h1>
        <h2 className="text-2xl text-blue-400 mb-6">
          Interactive learning powered by AI.
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Interactive video lessons, offline downloads, quizzes, and progress
          tracking. Your AI tutor is available 24/7 to solve doubts instantly
          and explain in multiple languages for better understanding.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleFeatureClick(feature.type)}
            className="rounded-4xl bg-gray-900/70 border border-gray-700 p-6 text-center text-white shadow-lg backdrop-blur-md cursor-pointer hover:shadow-blue-700/20"
          >
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-base">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleFeatureClick("ai")}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-5 rounded-4xl shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300"
      >
        <AiOutlineRobot className="text-3xl" />
      </motion.button>

      {/* Popup for Features */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <div className="bg-gray-900/80 border border-gray-700 rounded-4xl p-8 max-w-lg w-full text-white shadow-2xl">
              {renderPopupContent()}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-3xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartLearning;

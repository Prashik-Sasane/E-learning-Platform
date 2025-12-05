import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

const API_URL = "http://localhost:5000/api";

const ProductivityPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiPlan, setAiPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      title: "Choose Your Board",
      description: "Select CBSE, State Board, or Engineering for personalized content.",
      button: "Select Board",
    },
    {
      title: "Select Your Grade",
      description: "Pick your grade (6th–12th) or year of engineering studies.",
      button: "Select Grade",
    },
    {
      title: "Access Study Materials",
      description: "Get syllabus, notes, reference books, and past papers easily.",
      button: "View Resources",
    },
    {
      title: "AI Study Plans",
      description: "Generate a personalized study plan based on your progress.",
      button: "Generate Plan",
    },
  ];

  const handleAskAI = async () => {
  if (!aiPrompt.trim()) return;
  setLoading(true);
  setAiPlan(null);
  try {
    const res = await fetch(`${API_URL}/doubts/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: aiPrompt,
        feature: "ProductivityPage", // tells backend which page is requesting AI
        language: "English",         // optional: can make dynamic
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setAiPlan(data.error || "Failed to get AI plan");
    } else {
      setAiPlan(data.text || "No plan returned by AI.");
    }
  } catch (err) {
    console.error(err);
    setAiPlan("Something went wrong while contacting AI.");
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-3">Productivity</h1>
        <h2 className="text-2xl text-blue-400 mb-6">
          Personalized study plans for every student.
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Personalized Learning for Every Student. Explore courses tailored to your
          board (CBSE/State) and grade (6th–12th)/Engineering. Access syllabus,
          reference materials, past papers, and AI-generated study plans designed just
          for you.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 gap-8 max-w-5xl w-full">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="rounded-4xl bg-gray-900/70 border border-gray-700 p-6 text-center text-white shadow-lg backdrop-blur-md"
          >
            <h3 className="text-2xl font-semibold mb-3 text-blue-400">
              {card.title}
            </h3>
            <p className="text-gray-300 mb-6">{card.description}</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-4xl shadow transition">
              {card.button}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-5 rounded-4xl shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300"
      >
        <AiOutlineRobot className="text-3xl" />
      </motion.button>

      {/* AI Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-gray-900/80 border border-gray-700 rounded-4xl p-8 max-w-md w-full text-white shadow-2xl text-center">
              <h2 className="text-2xl font-semibold mb-3 text-blue-400">
                Take Help from AI
              </h2>
              <p className="text-gray-300 mb-6">
                Need a personalized study plan or guidance for your course? Ask AI to
                generate a schedule, suggest resources, or explain tough topics!
              </p>
              <textarea
                className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                rows={4}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="E.g. I am in 10th CBSE, want a 2‑month plan for Maths and Science..."
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-4xl transition"
                >
                  Close
                </button>
                <button
                  onClick={handleAskAI}
                  disabled={loading}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-4xl transition disabled:opacity-60"
                >
                  {loading ? "Asking..." : "Ask AI"}
                </button>
              </div>
              {aiPlan && (
                <div className="mt-4 p-3 rounded-2xl bg-gray-800 text-sm text-left whitespace-pre-wrap max-h-56 overflow-auto">
                  {aiPlan}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductivityPage;

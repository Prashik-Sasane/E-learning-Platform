import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

const API_URL = "http://localhost:5000/api";

const languages = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali"];

const MultiLanguageLearning: React.FC = () => {
  const [pageLanguage, setPageLanguage] = useState<string>("English");
  const [bookLanguages, setBookLanguages] = useState<string[]>(
    Array(9).fill("English")
  );
  const [showAi, setShowAi] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        feature: "MultiLanguageLearning", // tell backend which feature
        language: pageLanguage,          // send selected page language
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

  const handleBookLanguageChange = (index: number, lang: string) => {
    const updated = [...bookLanguages];
    updated[index] = lang;
    setBookLanguages(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative px-6 py-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-blue-400">
          Multi-Language Learning
        </h1>

        <div className="flex items-center space-x-3">
          <label className="text-gray-300 text-sm">Page Language:</label>
          <select
            value={pageLanguage}
            onChange={(e) => setPageLanguage(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-3xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 max-w-3xl mb-10">
        Learn in Your Own Language. All content is available in multiple Indian
        languages, so every student — from rural to urban — can study
        comfortably. Switch between English, Hindi, Marathi, Tamil, and more
        with one click.
      </p>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900/70 border border-gray-700 rounded-3xl p-5 shadow-lg backdrop-blur-md flex flex-col items-center"
          >
            <img
              src={`https://source.unsplash.com/400x520/?book,study,education&sig=${index}`}
              alt="Book cover"
              className="w-40 h-52 object-cover rounded-2xl mb-4 shadow-md"
            />
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Book {index + 1}
            </h3>

            <div className="flex flex-col items-center space-y-2 w-full">
              <label className="text-gray-400 text-sm">Select Language</label>
              <select
                value={bookLanguages[index]}
                onChange={(e) =>
                  handleBookLanguageChange(index, e.target.value)
                }
                className="w-full bg-gray-800 border border-gray-600 rounded-3xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating AI Chatbot Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-5 rounded-4xl shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300"
        onClick={() => setShowAi(true)}
      >
        <AiOutlineRobot className="text-3xl" />
      </motion.button>

      {/* Simple AI popup */}
      {showAi && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-6 max-w-lg w-full text-white">
            <h2 className="text-xl font-semibold mb-3 text-blue-400">
              Ask AI in {pageLanguage}
            </h2>
            <p className="text-gray-300 text-sm mb-3">
              Type any topic or question. The AI will explain it in the selected page
              language.
            </p>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="E.g. Explain Newton's laws in simple Hindi..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAi(false)}
                className="px-4 py-2 rounded-3xl bg-gray-700 hover:bg-gray-600 text-sm"
              >
                Close
              </button>
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="px-4 py-2 rounded-3xl bg-blue-600 hover:bg-blue-700 text-sm disabled:opacity-60"
              >
                {loading ? "Asking..." : "Ask AI"}
              </button>
            </div>
            {aiAnswer && (
              <div className="mt-4 p-3 rounded-2xl bg-gray-800 text-sm whitespace-pre-wrap max-h-56 overflow-auto">
                {aiAnswer}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiLanguageLearning;

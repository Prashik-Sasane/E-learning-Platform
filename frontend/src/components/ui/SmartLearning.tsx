import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

const SmartLearning: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const features = [
    {
      title: "Interactive Video Lessons",
      description:
        "Engaging video lessons that make learning fun, easy, and effective.",
    },
    {
      title: "Offline Downloads",
      description:
        "Download your lessons and learn anytime, anywhere — even without the internet.",
    },
    {
      title: "Smart Quizzes",
      description:
        "Test your understanding with adaptive quizzes that match your learning speed.",
    },
    {
      title: "Progress Tracking",
      description:
        "Track your daily learning progress and identify areas for improvement.",
    },
    {
      title: "AI Tutor (24/7)",
      description:
        "Ask questions, clear doubts, and get step-by-step explanations — available in multiple languages.",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-black/80 relative bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          'url(https://imgs.search.brave.com/mbFxW0iBv3IVY-u4F1aiUOOZtaUBVZZfUhgDHWmMTVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHV0b3JpZnkuaW4v/c3RhdGljL2ltYWdl/cy9ibG9nZ2luZy5z/dmc)',
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-3">
          Smarter Way to Learn
        </h1>
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
            whileHover={{ scale: 1.03 }}
            className="rounded-4xl bg-gray-900/70 border border-gray-700 p-6 text-center text-white shadow-lg backdrop-blur-md"
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
                Need help understanding a topic or solving a question?  
                Ask your AI tutor for instant guidance and step-by-step explanations.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-4xl transition"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('AI Tutor Feature Coming Soon!')}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-4xl transition"
                >
                  Ask AI
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

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

const DoubtPage: React.FC = () => {
  const [doubt, setDoubt] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [showCard, setShowCard] = useState<boolean>(false);
  const [aiAnswer, setAiAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubt.trim() || !subject) return;
    setShowCard(true);
    setAiAnswer("");
  };

  const handleAskAI = () => {
    setLoading(true);
    setAiAnswer("AI is thinking...");
    setTimeout(() => {
      setAiAnswer(
        `Subject: ${subject}\n\nHere's what I found for your question:\n\n${doubt}\n\n(Replace this with a real AI-generated answer.)`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Main Card */}
      <div className="w-full max-w-3xl mx-4 p-8 rounded-4xl bg-gradient-to-b from-gray-900/70 via-gray-800/50 to-black/40 border border-gray-700 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Artificial Intelligence
        </h1>
        <h2 className="text-2xl text-blue-400 text-center mb-6">
          Solve your doubts instantly with AI.
        </h2>

        <p className="text-gray-300 text-center">
          Clear Your Doubts Instantly with AI. Stuck on a math problem? Confused in physics?
          Need help with history? Our AI-powered assistant explains step-by-step answers in
          simple language, tailored to your grade level. Get solutions anytime, anywhere —
          no waiting for a teacher.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-sm text-gray-300 mb-2">Select Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-4xl p-3 bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          >
            <option value="" disabled>
              Choose a subject
            </option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="English">English</option>
          </select>

          <label className="block text-sm text-gray-300">Type your doubt</label>
          <textarea
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-4xl p-4 bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Explain Newton's Third Law in simple terms."
          />

          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-4xl shadow-lg transition-all mx-auto block"
          >
            Submit Your Doubt
          </button>
        </form>

        {showCard && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 bg-gray-900/70 border border-gray-700 rounded-4xl text-white backdrop-blur-sm"
          >
            <h2 className="text-lg font-semibold">Your Doubt:</h2>
            <p className="mt-2 text-gray-300">Subject: {subject}</p>
            <p className="mt-2 text-gray-300 whitespace-pre-wrap">{doubt}</p>

            <button
              onClick={handleAskAI}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-4xl text-white disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>

            {aiAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-gray-800/70 border border-gray-700 rounded-4xl text-gray-200 whitespace-pre-wrap"
              >
                {aiAnswer}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modern Floating AI Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-5 rounded-4xl shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <AiOutlineRobot className="text-3xl" />
      </motion.button>
    </>
  );
};

export default DoubtPage;
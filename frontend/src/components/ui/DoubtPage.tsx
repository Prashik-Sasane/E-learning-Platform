import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";

interface Message {
  role: "user" | "ai";
  subject?: string;
  text: string;
}

const DoubtPage: React.FC = () => {
  const [doubt, setDoubt] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("doubtMessages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("doubtMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!doubt.trim() || !subject) return;

    const userMessage: Message = { role: "user", subject, text: doubt };
    setMessages((prev) => [...prev, userMessage]);
    setDoubt("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/doubts/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are a teacher AI. Answer the following ${subject} question step by step:\n${doubt}`,
        }),
      });

      const data = await res.json();

      console.log(data);

      const aiMessage: Message = { role: "ai", text: data.text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini API Error Details:" ,err);
      const errorMessage: Message = {
        role: "ai",
        text: "Oops! Something went wrong while fetching the AI answer.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full  p-8 rounded-4xl bg-gradient-to-b from-gray-900/70 via-gray-800/50 to-black/40 border border-gray-700 shadow-2xl backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          AI Doubt Solver
        </h1>
        <h2 className="text-2xl text-blue-400 text-center mb-6">
          Solve your doubts instantly with AI
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">Select Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={loading}
            className="w-full rounded-4xl p-3 bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          >
            <option value="" disabled>Choose a subject</option>
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
            disabled={loading}
            className="mt-2 w-full rounded-4xl p-4 bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Explain Newton's Third Law in simple terms."
          />

          <button
            type="submit"
            disabled={loading || !doubt || !subject}
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-4xl shadow-lg transition-all mx-auto block disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Submit Your Doubt"}
          </button>
        </form>

        {/* Chat Messages */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-3xl ${
                msg.role === "user"
                  ? "bg-blue-700 self-end text-white"
                  : "bg-gray-800/70 border border-gray-700 text-gray-200 self-start"
              } whitespace-pre-wrap`}
            >
              {msg.role === "user" && msg.subject && (
                <p className="text-sm text-gray-300 mb-1">Subject: {msg.subject}</p>
              )}
              <p>{msg.text}</p>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

    
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

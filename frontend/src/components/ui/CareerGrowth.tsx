import React, { useState } from "react";

type Feature = {
  id: string;
  title: string;
  short: string;
  long: string;
};

const FEATURES: Feature[] = [
  {
    id: "explore",
    title: "Explore Any Subject",
    short: "From school to college topics — everything at your fingertips.",
    long:
      "Comprehensive, structured content across subjects. Deep-dive articles, video lessons, curated notes and quick revision packs. Adaptive suggestions help you focus on weak topics.",
  },
  {
    id: "exams",
    title: "Prepare for Exams",
    short: "UPSC, JEE, NEET, and more with curated material.",
    long:
      "Exam-specific learning paths: syllabus mapping, timed mock tests, previous-year question analysis, and strategy boosters. Track progress with visual dashboards and milestone reminders.",
  },
  {
    id: "coding",
    title: "Solve Coding Challenges",
    short: "Real-time AI guidance and hints for problems.",
    long:
      "Interactive coding playground with test-case driven problems, hints that unlock gradually, AI walkthroughs for tricky parts, and peer leaderboards to motivate steady improvement.",
  },
  {
    id: "doubt",
    title: "Instant AI Doubt Solving",
    short: "Ask anything and get AI-powered explanations instantly.",
    long:
      "Natural-language Q&A with step-by-step explanations, examples, and follow-up prompts. Supports equations, code snippets, and multipart questions. Save answers to your notes.",
  },
  {
    id: "plans",
    title: "Personalized Study Plans",
    short: "Smart daily and weekly goals built around your pace.",
    long:
      "AI-generated study plans that adapt when you miss sessions, recommend micro-tasks, and balance revision with learning. Exportable to calendar and downloadable for offline use.",
  },
  {
    id: "offline",
    title: "Offline Access",
    short: "Learn anywhere, anytime — even without internet.",
    long:
      "Download lessons, quizzes and notes for offline consumption. Progress syncs automatically when connection is restored. Low-bandwidth friendly modes included.",
  },
];

const API_URL = "http://localhost:5000/api"; // Replace with your backend API

const CareerGrowth: React.FC = () => {
  const [openFeature, setOpenFeature] = useState<Feature | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to ask AI
  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setLoading(true);
    setAiResponse(null);
    try {
      const res = await fetch(`${API_URL}/doubts/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (!res.ok) setAiResponse(data.error || "Failed to get AI response");
      else setAiResponse(data.text || "No response from AI");
    } catch (err) {
      console.error(err);
      setAiResponse("Something went wrong while contacting AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-xl font-bold shadow-lg">
            AI
          </div>
          <div>
            <h1 className="text-xl font-semibold">CareerGrowth</h1>
            <p className="text-xs text-slate-400">Learn. Grow. Succeed.</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <a href="#explore" className="hover:text-white">Explore</a>
          <a href="#courses" className="hover:text-white">Courses</a>
          <a href="#coding" className="hover:text-white">Coding</a>
          <a href="#offline" className="hover:text-white">Offline</a>
          <button className="bg-transparent border border-slate-600 text-slate-100 px-4 py-2 rounded-lg shadow-sm hover:bg-slate-800 transition">Get Started</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">The First Rule of Learning is Accessibility for Everyone</h2>
          <p className="text-slate-300 mb-6">
            Explore subjects, prepare for competitive exams, solve coding challenges, and clear your doubts instantly with AI. Personalized study plans and offline access keep you moving forward.
          </p>
          <div className="flex gap-4">
            <button className="bg-white/6 backdrop-blur-sm text-white px-5 py-3 rounded-lg shadow hover:bg-white/10 transition">Start Learning</button>
            <button className="border border-slate-700 text-slate-200 px-5 py-3 rounded-lg hover:bg-white/4 transition">Watch Demo</button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-96 h-96 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
            <img
              src="https://source.unsplash.com/600x600/?student,laptop,learning"
              alt="Career growth learning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-14">
        <h3 className="text-2xl font-semibold mb-6">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => setOpenFeature(f)}
              className="text-left p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-800/20 border border-slate-700 hover:scale-[1.01] transition shadow-lg"
            >
              <div className="text-3xl mb-3">
                {f.id === "coding" ? "💻" :
                 f.id === "exams" ? "🎯" :
                 f.id === "offline" ? "📶" :
                 f.id === "plans" ? "📅" :
                 f.id === "doubt" ? "⚡" : "📘"}
              </div>
              <h4 className="font-semibold text-lg mb-1">{f.title}</h4>
              <p className="text-slate-400 text-sm">{f.short}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Feature Modal */}
      {openFeature && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpenFeature(null)} />
          <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden border border-slate-700 bg-gradient-to-b from-black/50 to-slate-900/60 shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">{openFeature.title}</h3>
                <p className="text-slate-400 mt-2">{openFeature.long}</p>
              </div>
              <button
                onClick={() => setOpenFeature(null)}
                className="text-slate-300 bg-white/6 px-4 py-2 rounded-lg hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                <h4 className="font-medium">What you'll get</h4>
                <ul className="mt-2 text-sm text-slate-300 list-disc list-inside">
                  <li>Structured lessons and notes</li>
                  <li>Practice questions & mocks</li>
                  <li>AI hints and step-by-step solutions</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                <h4 className="font-medium">How it helps</h4>
                <p className="mt-2 text-sm text-slate-300">Personalized pacing and reminders keep you consistent. Exportable plans for offline study and sync across devices.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Button */}
      <button
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-xl focus:outline-none animate-pulse"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.95), rgba(59,130,246,0.95))",
          boxShadow: "0 8px 30px rgba(59,130,246,0.25), 0 0 40px rgba(99,102,241,0.12)",
        }}
        onClick={() => setAiOpen(true)}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <defs>
            <radialGradient id="g1" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#6B46FF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#g1)" opacity="0.98" />
          <g transform="translate(6,6)" fill="white">
            <path d="M6 0C3.238 0 1 2.238 1 5s2.238 5 5 5 5-2.238 5-5S8.762 0 6 0zm0 8.5A3.5 3.5 0 1 1 6 1.5 3.5 3.5 0 0 1 6 8.5z" />
            <rect x="0.5" y="9.2" width="11" height="1.6" rx="0.8" />
          </g>
        </svg>
      </button>

      {/* AI Assistant Modal */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-gray-900/80 p-6 rounded-3xl max-w-md w-full border border-slate-700">
            <h3 className="text-2xl font-semibold text-blue-400 mb-3">AI Assistant</h3>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
              className="w-full p-2 rounded-xl bg-gray-800 border border-slate-700 text-white mb-3"
              placeholder="Ask AI anything or request a study plan..."
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setAiOpen(false)} className="px-4 py-2 bg-gray-700 rounded-xl">Close</button>
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 rounded-xl disabled:opacity-60"
              >
                {loading ? "Thinking..." : "Ask AI"}
              </button>
            </div>
            {aiResponse && (
              <div className="mt-4 p-3 bg-gray-800 rounded-xl text-sm max-h-56 overflow-auto whitespace-pre-wrap">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-slate-500 mt-20 pb-6">
        © 2025 CareerGrowth — Empowering Minds with AI
      </footer>
    </div>
  );
};

export default CareerGrowth;

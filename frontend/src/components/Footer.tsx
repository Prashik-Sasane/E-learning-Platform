import React, { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & description */}
        <div>
          <h1 className="text-white text-xl font-bold flex items-center gap-2">
            <span className="text-blue-500">E</span> EduVerse
          </h1>
          <p className="mt-4 text-gray-400">
            An AI-powered learning platform for students from{" "}
            <span className="text-blue-500">Class 6 to Competitive Exams</span>.
          </p>
          <p className="text-gray-400 mt-1">
            Helping students learn smarter, faster, and in{" "}
            <span className="text-blue-500">multiple languages</span>.
          </p>
        </div>

        {/* Section 1 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Explore</h2>
          <ul className="space-y-2">
            {[
              "Courses",
              "Practice Problems",
              "Mock Tests",
              "Syllabus",
              "Board Info",
              "Resources",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Support</h2>
          <ul className="space-y-2">
            {[
              "AI Doubt Solver",
              "Study Planner",
              "Download Materials",
              "Offline Learning",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-white font-semibold mb-4">Connect</h2>
          <ul className="space-y-2">
            {["Facebook", "YouTube", "LinkedIn", "Telegram"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EduVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

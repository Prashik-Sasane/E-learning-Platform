"use client";
import React, { useEffect, useState } from "react";
import { Lock, Play, ExternalLink, TrendingUp, Clock, BookOpen } from "lucide-react";

const API_URL = "http://localhost:5000/api";

type FeaturedItem = {
  id: number;
  title: string;
  subtitle: string;
  chapters: number;
  items: number;
  locked: boolean;
  bgGradient?: string;
  realTimeLearning?: boolean;
  resources?: Array<{ title: string; url: string; type: string; platform?: string }>;
  insights?: {
    difficulty?: string;
    estimatedHours?: number;
    prerequisites?: string[];
    bestTimeToLearn?: string;
  };
  trendingTopics?: string[];
};

// Fallback static items (used before backend loads or if it fails)
const fallbackItems: FeaturedItem[] = [
  {
    id: 1,
    title: "AI-Powered Doubt Solving",
    subtitle: "Instant answers to academic questions",
    chapters: 5,
    items: 20,
    locked: false,
    bgGradient: "bg-gradient-to-r from-blue-400 to-purple-500",
  },
  {
    id: 2,
    title: "Personalized Study Plans",
    subtitle: "Tailored schedules for every student",
    chapters: 4,
    items: 15,
    locked: false,
    bgGradient: "bg-gradient-to-r from-green-400 to-teal-400",
  },
  {
    id: 3,
    title: "NCERT Learning Board",
    subtitle: "Structured curriculum aligned with NCERT",
    chapters: 6,
    items: 30,
    locked: true,
    bgGradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
  },
  {
    id: 4,
    title: "Competitive Exam Prep",
    subtitle: "Smart practice for JEE, NEET, and more",
    chapters: 3,
    items: 25,
    locked: false,
    bgGradient: "bg-gradient-to-r from-pink-400 to-red-400",
  },
];

export default function FeatureCarousel() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>(fallbackItems);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        // Fetch with credentials to include auth cookie
        const res = await fetch(`${API_URL}/explore/featured`, {
          credentials: "include",
        });
        if (!res.ok) return;
        const data = await res.json();
        const items: FeaturedItem[] = (data.items || []).map((item: any, idx: number) => ({
          id: item.id ?? idx + 1,
          title: item.title,
          subtitle: item.subtitle,
          chapters: item.chapters,
          items: item.items,
          locked: !!item.locked,
          // Use bgGradient from backend or fallback
          bgGradient:
            item.bgGradient ||
            "bg-gradient-to-r from-slate-800 to-slate-900",
          realTimeLearning: item.realTimeLearning || false,
          resources: item.resources || [],
          insights: item.insights || {},
          trendingTopics: item.trendingTopics || [],
        }));
        if (items.length) {
          setFeaturedItems(items);
        }
      } catch (err) {
        console.error("Failed to load featured items", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_URL}/explore/trending`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setTrendingTopics(data.topics || []);
        }
      } catch (err) {
        console.error("Failed to load trending topics", err);
      }
    };

    fetchFeatured();
    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 flex flex-col">
      <div className="mx-0 ml-6 md:ml-20 lg:ml-32 transition-all duration-300">
        {/* Welcome Header */}
        <header className="py-10 px-2 md:px-6 lg:px-10">
          <h2 className="text-lg font-semibold tracking-wide text-sky-600 mb-2">
            Welcome to
          </h2>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
            E-Learning Explore
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            Unlock interactive, AI-powered learning for every student, from smart question solving to tailored study plans and more.
          </p>
        </header>

        {/* Personalized Recommendations */}
        <section className="px-2 md:px-6 lg:px-10 pt-8 pb-16">
          <div className="flex items-center justify-between mb-4 ml-2">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-[#1e293b]">
                Personalized Recommendations
              </h2>
              <p className="text-sm text-gray-600">
                Based on your learning profile and goals • Real-time learning resources
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-sky-600">
              <TrendingUp size={16} />
              <span>Live Updates</span>
            </div>
          </div>
          <div className="no-scrollbar flex space-x-6 overflow-x-auto pb-6">
            {featuredItems.map((item, index) => (
              <div
                key={index}
                className={`relative min-w-[280px] max-w-sm rounded-2xl p-5 shadow-lg flex flex-col justify-between ${item.bgGradient} transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer`}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold flex-1">{item.title}</h3>
                    {item.realTimeLearning && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp size={12} />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-3 opacity-90">{item.subtitle}</p>
                  
                  <div className="flex justify-between text-sm font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {item.chapters} Chapters
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {item.items} Items
                    </span>
                  </div>

                  {/* Real-time Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs opacity-75 mb-1">Real-time Resources:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.resources.slice(0, 2).map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-white bg-opacity-30 hover:bg-opacity-50 px-2 py-1 rounded flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {resource.platform || "Resource"}
                            <ExternalLink size={10} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Insights */}
                  {item.insights && item.insights.estimatedHours && (
                    <div className="text-xs opacity-75">
                      ⏱️ ~{item.insights.estimatedHours} hours | {item.insights.difficulty || "Intermediate"}
                    </div>
                  )}
                </div>

                <div className="absolute bottom-5 right-5">
                  {item.locked ? (
                    <Lock size={24} className="opacity-70" />
                  ) : (
                    <Play size={24} className="opacity-70" />
                  )}
                </div>
                {item.locked && (
                  <span className="absolute top-4 right-5 bg-white bg-opacity-50 text-xs text-gray-700 px-2 py-1 rounded shadow-sm">
                    Locked
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Trending Topics Section */}
        {trendingTopics.length > 0 && (
          <section className="px-2 md:px-6 lg:px-10 pt-8 pb-16">
            <h2 className="text-2xl font-semibold mb-6 text-[#1e293b] ml-2 flex items-center gap-2">
              <TrendingUp size={24} className="text-sky-600" />
              Trending Topics
            </h2>
            <div className="flex flex-wrap gap-3 ml-2">
              {trendingTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 rounded-full text-sm font-medium hover:from-sky-200 hover:to-blue-200 transition-colors cursor-pointer"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Real-time Learning Features */}
        <section className="px-2 md:px-6 lg:px-10 pt-8 pb-16">
          <h2 className="text-2xl font-semibold mb-6 text-[#1e293b] ml-2">
            Real-time Learning Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Live Updates</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Get real-time updates on new courses, trending topics, and learning resources as they become available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ExternalLink className="text-green-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Web Resources</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Access curated links to Khan Academy, Coursera, YouTube tutorials, and other top learning platforms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-purple-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Smart Scheduling</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Get personalized study schedules based on your available time and optimal learning hours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

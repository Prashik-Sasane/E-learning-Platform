"use client";
import React, { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

export function SignupForm() {
  // Controlled state for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [surveyProgress, setSurveyProgress] = useState("");
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { firstName, lastName, email, password };

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "User registered successfully!");
        // Store user info for survey
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        // Show AI survey after successful registration
        setShowSurvey(true);
        startAISurvey(data.user);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  const startAISurvey = async (user: any) => {
    setSurveyLoading(true);
    
    try {
      // Start interactive survey
      const startRes = await fetch(`${API_URL}/survey/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        }),
        credentials: "include",
      });

      if (startRes.ok) {
        const data = await startRes.json();
        // Add AI's first question to conversation
        setConversation([{ role: "ai", text: data.question }]);
        setSurveyLoading(false);
      } else {
        throw new Error("Failed to start survey");
      }
    } catch (err) {
      console.error("Survey start error:", err);
      setSurveyLoading(false);
      // Fallback: navigate to explore
      setTimeout(() => {
        navigate("/explore");
      }, 1000);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAnswer.trim() || isProcessing) return;

    const answerText = currentAnswer.trim();
    const userMessage = { role: "user", text: answerText };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setCurrentAnswer("");
    setIsProcessing(true);

    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      
      const answerRes = await fetch(`${API_URL}/survey/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          conversationHistory: updatedConversation,
          answer: answerText,
        }),
        credentials: "include",
      });

      if (answerRes.ok) {
        const data = await answerRes.json();
        
        if (data.completed) {
          // Survey is complete
          setSurveyCompleted(true);
          setConversation([...updatedConversation, { role: "ai", text: "Thank you! I've completed your survey. Generating your personalized recommendations..." }]);
          
          // Wait a moment then navigate
          setTimeout(() => {
            navigate("/explore");
          }, 2000);
        } else {
          // Add AI's next question
          setConversation([...updatedConversation, { role: "ai", text: data.question }]);
        }
      } else {
        throw new Error("Failed to process answer");
      }
    } catch (err) {
      console.error("Answer processing error:", err);
      setConversation([...updatedConversation, { 
        role: "ai", 
        text: "I'm having trouble processing that. Could you try answering again?" 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Show AI Survey screen if survey is active
  if (showSurvey) {
    if (surveyLoading) {
      return (
        <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center animate-pulse">
              Starting your personalized survey...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8">
        <div className="flex flex-col h-[600px]">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-black mb-2">
              🤖 AI Learning Survey
            </h2>
            <p className="text-sm text-gray-600">
              Let's get to know you better! I'll ask a few questions to personalize your learning experience.
            </p>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {conversation.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.role === "ai" && (
                    <span className="text-lg mr-2">🤖</span>
                  )}
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3">
                  <span className="text-lg mr-2">🤖</span>
                  <span className="inline-flex space-x-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>

          {/* Answer Input */}
          {!surveyCompleted && (
            <form onSubmit={handleAnswerSubmit} className="flex gap-2">
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={isProcessing || !currentAnswer.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          )}

          {surveyCompleted && (
            <div className="text-center py-4">
              <p className="text-green-600 font-medium">✅ Survey completed! Redirecting to your personalized recommendations...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-black">Welcome to Aceternity</h2>
      <p className="mt-2 max-w-sm text-sm text-black">
        Signup to Aceternity and start your journey!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 text-black">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </LabelInputContainer>
        </div>

       
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>

        
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

       
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}

       
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

        
        <div className="flex flex-col space-y-4">
          <SocialButton icon={<IconBrandGithub />} text="GitHub" />
          <SocialButton icon={<IconBrandGoogle />} text="Google" />
        </div>
      </form>
    </div>
  );
}

const SocialButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <button
    className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black"
    type="button"
  >
    <span className="h-4 w-4">{icon}</span>
    <span className="text-sm">{text}</span>
    <BottomGradient />
  </button>
);

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

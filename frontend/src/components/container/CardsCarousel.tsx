"use client";

import React from "react";
import { Carousel, Card } from "../ui/Features";
import DoubtAssistantPage from "../ui/DoubtAssistantPage";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        What we Offers
      </h2>
      <Carousel items={data} />
    </div>
  );
}

const Doubts = () => {
  return (
<<<<<<< Updated upstream
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Clear Your Doubts Instantly with AI.
        </span>{" "}
        Stuck on a math problem? Confused in physics? Need help with history? 
        Our AI-powered assistant explains step-by-step answers in simple language, 
        tailored to your grade level. Get solutions anytime, anywhere — no waiting 
        for a teacher.
      </p>
      <img
        src="https://imgs.search.brave.com/mbFxW0iBv3IVY-u4F1aiUOOZtaUBVZZfUhgDHWmMTVo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHV0b3JpZnkuaW4v/c3RhdGljL2ltYWdl/cy9ibG9nZ2luZy5z/dmc"
        alt="AI doubt solver mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl"
      />
    </div>
=======
   <DoubtAssistantPage/>
>>>>>>> Stashed changes
  );
};

const Student = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Personalized Learning for Every Student.
        </span>{" "}
        Explore courses tailored to your board (CBSE/State) and grade (6th–12th). 
        Access syllabus, reference materials, past papers, and AI-generated study 
        plans designed just for you.
      </p>
      <img
        src="https://imgs.search.brave.com/r86w1iUJeHGosK5tTtkLMaPC63KlzAUiTQ_MZQ9RCKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb2Nr/dXBodW50LmNvL2Nk/bi9zaG9wL3Byb2R1/Y3RzL3N0dWRlbnQt/Y29tcHV0ZXItbGVh/cm5pbmctZWR1Y2F0/aW9uLWluc2lnaHQt/Y29uY2VwdC1wc2Rf/NjA3OWVmOTZhNjAz/OF85MDB4LmpwZz92/PTE2NDc5NjM2Njg"
        alt="Student learning resources mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl"
      />
    </div>
  );
};

const Learning = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Smarter Way to Learn.
        </span>{" "}
        Interactive video lessons, offline downloads, quizzes, and progress tracking. 
        AI tutor available 24/7 to solve doubts instantly and explain in multiple 
        languages for better understanding.
      </p>
      <img
        src="https://imgs.search.brave.com/-RLngCYz5OrdVVaYbmYE-Pew8MAzXXMl0j2PqyjstRQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9leHBl/cmllbmNlLWxlYXJu/aW5nLWV4cG9zdXJl/LWRyYXdpbmctaWNv/bi1jb25jZXB0LXBl/b3BsZS1oYXZpbmct/ODAzMjY3MzguanBn"
        alt="Learning experience mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl"
      />
    </div>
  );
};

const Competitive = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Crack Competitive Exams with Confidence.
        </span>{" "}
        Whether it’s NEET, JEE, UPSC, or MPSC, get structured preparation with mock 
        tests, problem-solving practice (like LeetCode), and personalized AI-generated 
        study schedules to boost performance.
      </p>
      <img
        src="https://imgs.search.brave.com/VGNz8fSeG0MMRXD9t6n3ERlY2VjgJl3pmgYcJi4oX5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvZXhhbS1jb25j/ZXB0LWV4YW1pbmF0/aW9uLW9ubGluZS10/ZXN0LWFuc3dlci1j/aGVja2xpc3Qtc3R1/ZGVudC1jb2xsYWdl/LWZsYXQtaWxsdXN0/cmF0aW9uLXZlY3Rv/ci1iYW5uZXJfMTI4/NzcyLTE4MDAuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
        alt="Competitive exams prep mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl"
      />
    </div>
  );
};

const Language = () => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Learn in Your Own Language.
        </span>{" "}
        All content is available in multiple Indian languages, so every student—
        from rural to urban—can study comfortably. Switch between English, Hindi, 
        Marathi, Tamil, and more with one click.
      </p>
      <img
        src="https://imgs.search.brave.com/VaaEp-4CSX36V469Ph9gZytOrPvOmlS1rwBvfUAPyoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vZ2FyYWdlc3Rv/Y2svZ2FyYWdlc3Rv/Y2sxNzAyL2dhcmFn/ZXN0b2NrMTcwMjE3/MjY1LzcyMzMwODg0/LWxlYXJuLWEtbmV3/LWxhbmd1YWdlLWNv/bmNlcHQuanBnP3Zl/cj02"
        alt="Language learning mockup"
        height="500"
        width="500"
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl"
      />
    </div>
  );
};

const Career = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p
              className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of learning is that it should be accessible to everyone.
              </span>{" "}
              Explore subjects, prepare for competitive exams, solve coding
              challenges, and clear your doubts instantly with AI. Whether
              you’re in school, college, or preparing for UPSC, our platform
              helps you stay on track with personalized study plans and offline
              access.
            </p>
            <img
              src="https://imgs.search.brave.com/azBZd-Sy44_HSLT2HHoLJ5c5hYaCuBMsqQnCHcJ9kMo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/ODk2Mjg5NC9waG90/by9lLWxlYXJuaW5n/LWVkdWNhdGlvbi10/ZWNobm9sb2d5LW9u/bGluZS1jb3Vyc2Ut/aW50ZXJuZXQtY29u/Y2VwdC13ZWJpbmFy/LW9ubGluZS1lZHVj/YXRpb24tb24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTJP/WjNkc3p4MURkQW9H/UFlaM19mWnZEbkdR/bnJpRFA2SGZpMUxK/Um92Y009"
              alt="E-learning mockup"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-4 rounded-3xl" />
              <button className="w-60 h-full mx-auto object-contain mt-4 p-2 bg-blue-600 rounded-4xl ml-74 cursor-pointer">Get Started</button>
          </div>
        );
      })}
    </>
  );
};
const data = [
  {
    category: "Artificial Intelligence",
    title: "Solve your doubts instantly with AI.",
    src: "https://plus.unsplash.com/premium_photo-1682124651258-410b25fa9dc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8MHx8fDA%3D",
    content: <Doubts />,
  },
  {
    category: "Productivity",
    title: "Personalized study plans for every student.",
    src: "https://imgs.search.brave.com/NuEc0AzPOXMJv1UgrTv7-z87OfAQtkMI5GX1zpyYiMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmluZ2NlbnRyYWwu/Y29tL3VzL2VuL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMTEvY29sbGFi/b3JhdGl2ZS1sZWFy/bmluZy5qcGc",
    content: <Student />,
  },
  {
    category: "Learning",
    title: "Board syllabus, NCERT, and state curriculum in one place.",
    src: "https://imgs.search.brave.com/43wfY2lBWmrbmmHukz4G2bII9SU0p6zLXhB_96uMk_w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lZHVj/YXJ0LWltYWdlcy5w/YWdlcy5kZXYvMTAu/d2VicA",
    content: <Learning />,
  },
  {
    category: "Competitive Exams",
    title: "Prepare for UPSC, MPSC, NEET, JEE with smart practice.",
    src: "https://imgs.search.brave.com/4GpajrOXXPSJsHO8XQlE-x9vyj1rfZHcuKSV8Bg0T7Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvOTM0/Mzc1MC5qcGc",
    content: <Competitive />,
  },
  {
    category: "Multi-language Learning",
    title: "Study in your own language with offline downloads.",
    src: "https://imgs.search.brave.com/rvxOTED8uqQbt_hqXkFH6bSjmwhTD2u8c-VUDgF8MQw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb2Np/YWwtbWVkaWEtY2xv/dWQtZmFtb3VzLWlu/ZGlhbi1wZW9wbGUt/dGhpbmdzLWluZGlh/LW1hcC13b3JkLWNs/b3VkLWZhbW91cy1p/bmRpYW4tcGVvcGxl/LXRoaW5ncy1pbmRp/YS1tYXAtMjU0NDM2/NzQ4LmpwZw",
    content: <Language />,
  },
  {
    category: "Career Growth",
    title: "Skill up with coding, law, and medical practice modules.",
    src: "https://imgs.search.brave.com/_XAEgSoBJ0uvINZUtSZc_7lGasGHG6denK6xhmG1qWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1LzMxLzczLzkw/LzM2MF9GXzE1MzE3/MzkwNDhfV3o5WTNF/eFJBMFFpbHBKa05I/bTBCRnBzbHVXbU80/cFUuanBn",
    content: <Career />,
  },

];

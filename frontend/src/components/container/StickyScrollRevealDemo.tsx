"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";


const content = [
    {
    title: "Collaborative Learning",
    description:
      "Study together in real time with classmates, teachers, and mentors. Share notes, exchange ideas, and solve problems as a team. Our platform helps you stay connected and learn faster through collaboration.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://imgs.search.brave.com/QYkywUruM7s0fmQhcb69bsG2RnIhHAwIavwCKIuF3-0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb2xs/YWJvcmF0aXZlLWxl/YXJuaW5nLXNob3du/LWJ1c2luZXNzLXBo/b3RvLXVzaW5nLXRl/eHQtMjM0MTE3MTY1/LmpwZw"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="students collaborating"
        />
      </div>
    ),
  },
  {
    title: "Instant AI Help",
    description:
      "Clear your doubts instantly. Get step-by-step answers powered by AI across subjects like Math, Science, and Languages. No waiting — just type your question and get help anytime, anywhere.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://imgs.search.brave.com/EDi54-gI6qahbqMrzto5znkiYLj_6CBzhHOEr0lUBEQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odW1h/bmxpLmFpL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzA2L3N0/ZXB0b2Rvd24uY29t/ODQwMDY4LmpwZw"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="AI helping student"
        />
      </div>
    ),
  },
  {
    title: "Progress Tracking",
    description:
      "Keep track of your learning journey with real-time progress updates. Know what topics you’ve mastered and what needs revision. Stay aligned with your study goals and boost your performance with clarity.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://imgs.search.brave.com/SxBmQ2dDRQ0YYh3GFtqNU9Ipi7bZ4WsfzR-FJGJhQtE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8x/Ni81My9idXNpbmVz/c21hbi1jbGltYmlu/Zy1jYXJlZXItY2hh/cnQtdmVjdG9yLTUz/OTcxNjUzLmpwZw"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="progress tracking dashboard"
        />
      </div>
    ),
  },
  {
    title: "Limitless Resources",
    description:
      "Never run out of study material again. From past papers to curated notes and practice quizzes, our platform ensures you always have access to the right content at the right time.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Limitless Learning Resources
      </div>
    ),
  },

];
export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}

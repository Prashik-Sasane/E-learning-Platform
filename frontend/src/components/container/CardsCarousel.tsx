"use client";

import React from "react";
import { Carousel, Card } from "../ui/Features";
import DoubtPage from "../ui/DoubtPage";
import ProductivityPage from "../ui/ProductivityPage";
import SmartLearning from "../ui/SmartLearning";
import MultiLanguageLearning from "../ui/MultiLanguageLearning";
import CompetitivePrep from "../ui/CompetitivePrep";
import CareerGrowth from "../ui/CareerGrowth";


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
   <DoubtPage/>
  );
};

const Student = () => {
  return (
    <ProductivityPage/>
  );
};

const Learning = () => {
  return (
   <SmartLearning/>
  );
};

const Competitive = () => {
  return (
   <CompetitivePrep/>
  );
};

const Language = () => {
  return (
    <MultiLanguageLearning/>
  );
};

const Career = () => {
  return (
   <CareerGrowth/>
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

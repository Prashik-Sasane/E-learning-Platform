import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, MotionValue } from "motion/react";
import { cn } from "../../lib/utils";

interface FollowerPointerProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode; // can be string OR component
}

export const FollowerPointerCard: React.FC<FollowerPointerProps> = ({
  children,
  className,
  title,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);

  // update bounding box on resize
  useEffect(() => {
    const updateRect = () => {
      if (ref.current) setRect(ref.current.getBoundingClientRect());
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (rect) {
      x.set(e.clientX - rect.left + window.scrollX);
      y.set(e.clientY - rect.top + window.scrollY);
    }
  };

  return (
    <div
      onMouseLeave={() => setIsInside(false)}
      onMouseEnter={() => setIsInside(true)}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

interface FollowPointerProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  title?: React.ReactNode;
}

export const FollowPointer: React.FC<FollowPointerProps> = ({ x, y, title }) => {
  const colors = ["#0ea5e9", "#737373", "#14b8a6", "#22c55e", "#3b82f6", "#ef4444", "#eab308"];
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

  return (
    <motion.div
      className="absolute z-50"
      style={{ translateX: x, translateY: y, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {/* Pointer icon */}
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-sky-600 text-sky-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>

      {/* Floating text or component */}
      <motion.div
        style={{ backgroundColor: color }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="mt-2 min-w-max rounded-full px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg"
      >
        {title || "William Shakespeare"}
      </motion.div>
    </motion.div>
  );
};

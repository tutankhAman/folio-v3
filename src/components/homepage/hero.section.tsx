"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import VerticalCutReveal from "../animations/text/vertical-cut-reveal";

interface Word {
  id: string;
  text: string;
  className?: string;
}

// Data structure defining the flow
const flow: Word[][] = [
  [
    { id: "hey", text: "Hey", className: "text-neutral-600" },
    { id: "im", text: "I'm", className: "text-neutral-600" },
    { id: "aman", text: "Aman", className: "text-black" },
  ],
  [
    { id: "im", text: "I'm", className: "text-neutral-600" },
    { id: "a", text: "a", className: "text-neutral-600" },
    { id: "designer", text: "designer", className: "text-black" },
  ],
  [
    { id: "im", text: "I'm", className: "text-neutral-600" },
    { id: "a", text: "a", className: "text-neutral-600" },
    { id: "developer", text: "developer", className: "text-black" },
  ],
  [
    { id: "and", text: "and", className: "text-neutral-600" },
    { id: "a", text: "a", className: "text-neutral-600" },
    { id: "cs", text: "cs", className: "text-neutral-600" },
    { id: "student", text: "student", className: "text-black" },
  ],
  [
    { id: "i", text: "I", className: "text-neutral-600" },
    { id: "prefer", text: "prefer", className: "text-neutral-600" },
    { id: "minimal", text: "minimal", className: "text-neutral-600" },
    { id: "solutions", text: "solutions", className: "text-black" },
    { id: "with", text: "with", className: "text-neutral-600" },
    { id: "maximal", text: "maximal", className: "text-neutral-600" },
    { id: "intent", text: "intent", className: "text-black" },
  ],
  [
    { id: "here", text: "Here", className: "text-neutral-600" },
    { id: "are", text: "are", className: "text-neutral-600" },
    { id: "some", text: "some", className: "text-neutral-600" },
    { id: "of", text: "of", className: "text-neutral-600" },
    { id: "my", text: "my", className: "text-neutral-600" },
    { id: "works", text: "works", className: "text-black" },
  ],
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0-1) to stage index (0 to flow.length - 1)
    const totalStages = flow.length;
    const step = 1 / totalStages;

    // Calculate new stage, clamping between 0 and totalStages - 1
    let newStage = Math.floor(latest / step);
    if (newStage < 0) {
      newStage = 0;
    }
    if (newStage >= totalStages) {
      newStage = totalStages - 1;
    }

    if (newStage !== stage) {
      if (newStage > stage) {
        setDirection("down");
      } else {
        setDirection("up");
      }
      setStage(newStage);
    }
  });

  const currentWords = flow[stage] || [];

  return (
    <section className="relative h-[600vh]" ref={containerRef}>
      <div
        className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden"
        style={
          {
            "--reveal-y-hidden": direction === "down" ? "100%" : "-100%",
            "--reveal-y-exit": direction === "down" ? "-100%" : "100%",
          } as React.CSSProperties
        }
      >
        <div className="flex max-w-4xl flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2 px-4 text-center font-medium font-satoshi text-xl">
          <AnimatePresence mode="popLayout">
            {currentWords.map((word) => (
              <VerticalCutReveal
                containerClassName={word.className}
                key={word.id}
                layout
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 21,
                }} // Enable layout animations for smooth position changes
              >
                {word.text}
              </VerticalCutReveal>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

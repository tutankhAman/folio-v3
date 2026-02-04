"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import VerticalCutReveal from "../animations/text/vertical-cut-reveal";

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) {
      setStage(0);
    } else if (latest < 0.6) {
      setStage(1);
    } else {
      setStage(2);
    }
  });

  const getRole = () => {
    if (stage === 0) {
      return "AMAN";
    }
    if (stage === 1) {
      return "Designer";
    }
    return "Developer";
  };

  return (
    <section className="relative h-[300vh]" ref={containerRef}>
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden text-neutral-600">
        <div className="relative flex items-center justify-center">
          <div className="absolute right-full mr-3 flex items-center whitespace-nowrap font-medium font-satoshi text-xl">
            <AnimatePresence mode="popLayout">
              {stage === 0 && (
                <VerticalCutReveal
                  containerClassName="flex-nowrap whitespace-nowrap mr-1"
                  key="hey"
                  splitBy="characters"
                  staggerDuration={0.025}
                  staggerFrom="first"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 21,
                  }}
                >
                  Hey,
                </VerticalCutReveal>
              )}
            </AnimatePresence>
            <span>I'm</span>
          </div>

          <div className="grid min-w-[100px] items-center justify-start text-left font-medium font-satoshi text-black text-xl">
            <AnimatePresence>
              <VerticalCutReveal
                containerClassName="flex-nowrap whitespace-nowrap col-start-1 row-start-1"
                key={getRole()}
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="first"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 21,
                }}
              >
                {getRole()}
              </VerticalCutReveal>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

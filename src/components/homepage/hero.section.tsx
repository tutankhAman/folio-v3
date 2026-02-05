"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { flow, imageFlow } from "../../data/hero";
import VerticalCutReveal from "../animations/text/vertical-cut-reveal";

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Global scroll for velocity tracking
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // "Window wobble" / stretch effect based on scroll velocity
  const scaleY = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [1.35, 1, 1.35]
  );
  const skewY = useTransform(smoothVelocity, [-3000, 0, 3000], [-10, 0, 10]);

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
  const currentImages = imageFlow[stage] || [];

  const getSide = (className?: string) => {
    if (!className) {
      return "left";
    }
    if (className.includes("right")) {
      return "right";
    }
    return "left";
  };

  const imageVariants = {
    enter: ({
      direction,
      isMobile,
      side,
    }: {
      direction: "up" | "down";
      isMobile: boolean;
      side: "left" | "right";
    }) => {
      if (isMobile) {
        return {
          x: side === "left" ? "-100vw" : "100vw",
          y: 0,
          rotateX: 0,
          scale: 0.6,
          filter: "blur(8px)",
          opacity: 0,
        };
      }
      return {
        y: direction === "down" ? "110vh" : "-110vh",
        rotateX: direction === "down" ? 65 : -65, // Increased rotation for stronger 3D effect
        scale: 0.6, // Smaller start scale to exaggerate depth
        filter: "blur(8px)",
        opacity: 0,
        x: 0,
      };
    },
    center: {
      y: 0,
      x: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.4, // Slightly longer for more visual time
        bounce: 0,
        damping: 18, // Lower damping to let it carry momentum visually
        stiffness: 80,
      } as const,
    },
    exit: ({
      direction,
      isMobile,
      side,
    }: {
      direction: "up" | "down";
      isMobile: boolean;
      side: "left" | "right";
    }) => {
      if (isMobile) {
        return {
          x: side === "left" ? "-100vw" : "100vw",
          y: 0,
          rotateX: 0,
          scale: 0.6,
          filter: "blur(8px)",
          opacity: 0,
          transition: {
            type: "spring",
            duration: 1.4,
            bounce: 0,
            damping: 18,
            stiffness: 80,
          } as const,
        };
      }
      return {
        y: direction === "down" ? "-110vh" : "110vh",
        rotateX: direction === "down" ? -65 : 65,
        scale: 0.6,
        filter: "blur(8px)",
        opacity: 0,
        x: 0,
        transition: {
          type: "spring",
          duration: 1.4,
          bounce: 0,
          damping: 18,
          stiffness: 80,
        } as const,
      };
    },
  };

  return (
    <section className="relative h-[2000vh]" ref={containerRef}>
      <div
        className="sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden"
        style={
          {
            "--reveal-y-hidden": direction === "down" ? "100%" : "-100%",
            "--reveal-y-exit": direction === "down" ? "-100%" : "100%",
            perspective: "600px", // Reduced perspective for dramatic foreshortening
          } as React.CSSProperties
        }
      >
        {/* Images Layer */}
        <div className="pointer-events-none absolute inset-0 block">
          <AnimatePresence custom={{ direction, isMobile }}>
            {currentImages.map((img) => (
              <motion.div
                animate="center"
                className={cn(
                  "absolute origin-center",
                  img.className,
                  img.color
                )}
                custom={{ direction, isMobile, side: getSide(img.className) }}
                exit="exit"
                initial="enter"
                key={img.id}
                style={{ scaleY, skewY, transformStyle: "preserve-3d" }} // Enable 3D transform style
                variants={imageVariants}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-[0.3em] gap-y-2 px-4 text-center font-medium font-satoshi text-xl">
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

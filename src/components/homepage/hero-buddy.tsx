"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buddyStageConfig } from "../../data/buddy";
import { AsciiBuddy } from "../shared/ascii-buddy";

// ─── Hero Buddy ──────────────────────────────────────────────────────────────
// A persistent ASCII buddy companion that teleports around the hero viewport,
// making random stage-aware comments via a speech bubble. Desktop only.

interface HeroBuddyProps {
  stage: number;
}

export const HeroBuddy = ({ stage }: HeroBuddyProps) => {
  const [comment, setComment] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const prevStageRef = useRef(stage);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = buddyStageConfig[stage];

  // Pick a random comment when stage changes
  const pickComment = useCallback(
    (stageConfig: (typeof buddyStageConfig)[number] | undefined) => {
      if (!stageConfig) {
        return "";
      }
      const comments = stageConfig.comments;
      return comments[Math.floor(Math.random() * comments.length)];
    },
    []
  );

  // When stage changes, teleport + new comment with a slight delay for the "arrival"
  useEffect(() => {
    if (stage === prevStageRef.current && comment !== "") {
      return;
    }
    prevStageRef.current = stage;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide bubble briefly during teleport
    setShowBubble(false);

    // After teleport animation settles, show new comment
    timeoutRef.current = setTimeout(() => {
      const newComment = pickComment(config);
      setComment(newComment);
      setBubbleKey((k) => k + 1);
      if (newComment) {
        setShowBubble(true);
      }

      // Auto-hide the bubble after a while
      timeoutRef.current = setTimeout(
        () => {
          setShowBubble(false);
        },
        4000 + Math.random() * 2000
      );
    }, 600); // Wait for teleport animation

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [stage, config, pickComment, comment]);

  // Determine bubble position relative to buddy (flip based on where buddy is)
  const bubblePosition = useMemo(() => {
    if (!config) {
      return "left";
    }
    const pos = config.position;
    // If buddy is on the right side, bubble goes left; and vice versa
    if (pos.includes("right-[")) {
      return "left" as const;
    }
    if (pos.includes("left-[5") && pos.includes("top-")) {
      return "right" as const;
    }
    if (pos.includes("left-[6%]")) {
      return "right" as const;
    }
    return "top" as const;
  }, [config]);

  if (!config) {
    return null;
  }

  return (
    <motion.div
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      className={cn("absolute z-20 hidden md:block", config.position)}
      initial={{
        opacity: 0,
        scale: 0.8,
        filter: "blur(4px)",
      }}
      key={`buddy-pos-${stage}`}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.15,
      }}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && comment && (
          <motion.div
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            className={cn(
              "pointer-events-none absolute whitespace-nowrap",
              bubblePosition === "left" && "top-1 right-full mr-3",
              bubblePosition === "right" && "top-1 left-full ml-3",
              bubblePosition === "top" &&
                "bottom-full left-1/2 mb-3 -translate-x-1/2"
            )}
            exit={{
              opacity: 0,
              y: -4,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            initial={{
              opacity: 0,
              y: 6,
              scale: 0.9,
            }}
            key={bubbleKey}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.2,
            }}
          >
            <div className="relative rounded-md border border-black/[0.08] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="font-mono text-[11px] text-black/60 leading-none">
                {comment}
              </span>
              {/* Tail / Arrow */}
              {bubblePosition === "left" && (
                <div className="absolute top-3 -right-[5px] h-0 w-0 border-y-[4px] border-y-transparent border-l-[5px] border-l-black/[0.08]" />
              )}
              {bubblePosition === "right" && (
                <div className="absolute top-3 -left-[5px] h-0 w-0 border-y-[4px] border-y-transparent border-r-[5px] border-r-black/[0.08]" />
              )}
              {bubblePosition === "top" && (
                <div className="absolute -bottom-[5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[5px] border-t-black/[0.08]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The buddy itself */}
      <AsciiBuddy inView={true} />
    </motion.div>
  );
};

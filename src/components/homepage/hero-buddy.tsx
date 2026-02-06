"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buddyStageConfig } from "../../data/buddy";
import { AsciiBuddy } from "../shared/ascii-buddy";

// ─── Hero Buddy ──────────────────────────────────────────────────────────────
// A persistent ASCII buddy companion that teleports around the hero viewport.
// Simplified logic: instant teleport without expensive glitch/blur effects.

interface HeroBuddyProps {
  stage: number;
}

export const HeroBuddy = ({ stage }: HeroBuddyProps) => {
  const [activePosition, setActivePosition] = useState(
    buddyStageConfig[0]?.position ?? ""
  );
  const [teleportStatus, setTeleportStatus] = useState<TeleportState>("idle");
  const [comment, setComment] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);

  const prevStageRef = useRef<number | null>(null);
  const timeoutChain = useRef<ReturnType<typeof setTimeout>[]>([]);

  const config = buddyStageConfig[stage];

  const clearTimeouts = useCallback(() => {
    for (const t of timeoutChain.current) {
      clearTimeout(t);
    }
    timeoutChain.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timeoutChain.current.push(t);
    return t;
  }, []);

  const pickComment = useCallback(
    (stageConfig: (typeof buddyStageConfig)[number] | undefined) => {
      if (!stageConfig) {
        return "";
      }
      const pool = stageConfig.comments;
      return pool[Math.floor(Math.random() * pool.length)];
    },
    []
  );

  // Determine bubble position relative to buddy
  const bubblePosition = useMemo(() => {
    if (!config) {
      return "left";
    }
    const pos = config.position;
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

  // ── Initial mount — settle immediately with first comment ────────────────
  useEffect(() => {
    const initConfig = buddyStageConfig[0];
    setActivePosition(initConfig?.position ?? "");
    prevStageRef.current = 0;
    const c = pickComment(initConfig);
    setComment(c);
    setBubbleKey(1);
    if (c) {
      schedule(() => {
        setShowBubble(true);
      }, 800);
    }
    return () => {
      clearTimeouts();
    };
  }, [pickComment, schedule, clearTimeouts]);

  // ── Teleport sequence — fires ONLY when stage changes ────────────────────
  useEffect(() => {
    // Skip if this is the initial render (handled by mount effect above)
    if (prevStageRef.current === null) {
      return;
    }
    // Skip if stage hasn't actually changed
    if (stage === prevStageRef.current) {
      return;
    }

    const targetConfig = buddyStageConfig[stage];
    prevStageRef.current = stage;
    clearTimeouts();
    setShowBubble(false);

    // Teleport sequence
    setTeleportStatus("out");

    schedule(() => {
      // Instant swap
      setActivePosition(targetConfig?.position ?? "");
      setTeleportStatus("in");

      schedule(() => {
        setTeleportStatus("idle");

        const c = pickComment(targetConfig);
        setComment(c);
        setBubbleKey((k) => k + 1);

        if (c) {
          schedule(() => {
            setShowBubble(true);
          }, 150);

          // Auto-hide bubble after 4-6s
          schedule(
            () => {
              setShowBubble(false);
            },
            4000 + Math.random() * 2000
          );
        }
      }, 300); // Wait for appear animation
    }, 300); // Wait for disappear animation

    return () => {
      clearTimeouts();
    };
  }, [stage, pickComment, schedule, clearTimeouts]);

  if (!config) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 hidden md:block",
        activePosition
      )}
    >
      {/* The buddy body */}
      <div className="pointer-events-auto relative origin-bottom">
        {/* The living ASCII buddy — never unmounted */}
        <AsciiBuddy
          expressionHint={config?.expressionHint}
          inView={true}
          teleportState={teleportStatus}
        />
      </div>

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
              transition: { duration: 0.15, ease: [0.76, 0, 0.24, 1] },
            }}
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.92,
            }}
            key={bubbleKey}
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0.15,
            }}
          >
            <div className="relative rounded-md border border-black/[0.08] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="font-mono text-[11px] text-black/60 leading-none">
                {comment}
              </span>
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
    </div>
  );
};

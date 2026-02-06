"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buddyStageConfig } from "../../data/buddy";

// ─── Mini Hero Buddy ─────────────────────────────────────────────────────────
// A compact mobile-friendly ASCII companion that sits at the bottom of the
// hero viewport. Retains expression changes, teleportation, and speech bubbles
// in a sleek, non-intrusive single-line format.

interface MiniHeroBuddyProps {
  stage: number;
}

// Compact single-line expressions that mirror the full AsciiBuddy EXPRESSIONS
const MINI_EXPRESSIONS = [
  { face: "( o ~ o )", label: "chillin" },
  { face: "( ^ u ^ )", label: "happy" },
  { face: "( > w < )", label: "uwu" },
  { face: "( 0 o 0 )", label: "surprised" },
  { face: "( - . - )", label: "sleepy" },
  { face: "( * _ * )", label: "excited" },
  { face: "( ~ - ~ )", label: "meh" },
  { face: "( ^ u - )", label: "wink" },
  { face: "( x . x )", label: "dead" },
  { face: "( ♥ w ♥ )", label: "love" },
  { face: "( $ _ $ )", label: "rich" },
  { face: "( o / O )", label: "confused" },
] as const;

// Glitch characters for teleport effect
const GLYPHS = "░▒▓█<>/\\[]!@#$%^&*";

const glitchFace = (face: string, intensity: number): string => {
  return face
    .split("")
    .map((ch) => {
      if (ch === "(" || ch === ")" || ch === " ") {
        return intensity > 0.7 ? " " : ch;
      }
      if (Math.random() < intensity) {
        return intensity > 0.6
          ? " "
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      return ch;
    })
    .join("");
};

export const MiniHeroBuddy = ({ stage }: MiniHeroBuddyProps) => {
  const [comment, setComment] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const [teleportPhase, setTeleportPhase] = useState<"idle" | "out" | "in">(
    "idle"
  );
  const [glitchedFace, setGlitchedFace] = useState("");

  const prevStageRef = useRef<number | null>(null);
  const timeoutChain = useRef<ReturnType<typeof setTimeout>[]>([]);

  const config = buddyStageConfig[stage];
  const expressionIdx = config?.expressionHint ?? 0;
  const expression = MINI_EXPRESSIONS[expressionIdx] ?? MINI_EXPRESSIONS[0];

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

  // ── Glitch animation frames ────────────────────────────────────────────────
  useEffect(() => {
    if (teleportPhase === "idle") {
      setGlitchedFace("");
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) {
        startTime = time;
      }
      const duration = 250;
      const progress = Math.min((time - startTime) / duration, 1);

      const intensity =
        teleportPhase === "out" ? progress * 1.3 : (1 - progress) * 1.3;
      setGlitchedFace(glitchFace(expression.face, Math.min(intensity, 1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [teleportPhase, expression.face]);

  // ── Initial mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    const initConfig = buddyStageConfig[0];
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

  // ── Teleport on stage change ───────────────────────────────────────────────
  useEffect(() => {
    if (prevStageRef.current === null) {
      return;
    }
    if (stage === prevStageRef.current) {
      return;
    }

    const targetConfig = buddyStageConfig[stage];
    prevStageRef.current = stage;
    clearTimeouts();
    setShowBubble(false);

    // Teleport out
    setTeleportPhase("out");

    schedule(() => {
      // Teleport in
      setTeleportPhase("in");

      schedule(() => {
        setTeleportPhase("idle");

        const c = pickComment(targetConfig);
        setComment(c);
        setBubbleKey((k) => k + 1);

        if (c) {
          schedule(() => {
            setShowBubble(true);
          }, 150);

          // Auto-hide after 4-6s
          schedule(
            () => {
              setShowBubble(false);
            },
            4000 + Math.random() * 2000
          );
        }
      }, 250);
    }, 250);

    return () => {
      clearTimeouts();
    };
  }, [stage, pickComment, schedule, clearTimeouts]);

  // Blink state
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 120);
      timeout = setTimeout(blink, 2000 + ((Date.now() * 7) % 3000));
    };
    timeout = setTimeout(blink, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const blinkFace = useMemo(() => {
    // Replace eye characters with dashes for blink
    const face = expression.face;
    // The face format is "( L M R )" where L and R are eyes
    // Replace characters at positions 2 and 6 (the eye positions)
    const chars = face.split("");
    if (chars[2] && chars[2] !== " ") {
      chars[2] = "-";
    }
    if (chars[6] && chars[6] !== " ") {
      chars[6] = "-";
    }
    return chars.join("");
  }, [expression.face]);

  const displayFace = useMemo(() => {
    if (teleportPhase !== "idle" && glitchedFace) {
      return glitchedFace;
    }
    if (isBlinking) {
      return blinkFace;
    }
    return expression.face;
  }, [teleportPhase, glitchedFace, isBlinking, blinkFace, expression.face]);

  if (!config) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 flex justify-center pb-5 md:hidden">
      <div className="pointer-events-auto flex flex-col items-center gap-1.5">
        {/* Speech bubble — above the face */}
        <AnimatePresence>
          {showBubble && comment && (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="pointer-events-none"
              exit={{
                opacity: 0,
                y: 4,
                scale: 0.95,
                transition: { duration: 0.12, ease: [0.76, 0, 0.24, 1] },
              }}
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              key={bubbleKey}
              transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
            >
              <div className="relative rounded-md border border-fg/[0.06] bg-surface-elevated/90 px-2.5 py-1 shadow-sm backdrop-blur-md">
                <span className="font-mono text-[10px] text-fg/50 leading-none">
                  {comment}
                </span>
                {/* Down arrow */}
                <div className="absolute -bottom-[4px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[3.5px] border-x-transparent border-t-[4px] border-t-fg/[0.06]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact ASCII face + label */}
        <motion.div
          animate={{
            opacity: teleportPhase === "out" ? 0 : 1,
            scale: teleportPhase === "out" ? 0.8 : 1,
          }}
          className="flex items-center gap-1.5"
          transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <span
            className={cn(
              "font-mono text-[11px] leading-none tracking-tight transition-colors duration-300",
              teleportPhase !== "idle" ? "text-fg/30" : "text-fg/50"
            )}
          >
            {displayFace}
          </span>
          <span className="font-mono text-[8px] text-fg/30 uppercase tracking-widest">
            {expression.label}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

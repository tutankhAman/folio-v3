"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { buddyStageConfig } from "../../data/buddy";
import { AsciiBuddy } from "../shared/ascii-buddy";

// ─── Hero Buddy ──────────────────────────────────────────────────────────────
// A persistent ASCII buddy companion that teleports around the hero viewport.
// Teleport sequence: glitch-scramble → collapse → reappear → settle + comment.
// The buddy itself is never unmounted — only the wrapper's position changes.

// Glitch characters used during the scramble phase
const GLITCH_CHARS = "█▓▒░╬╠╣╚╗┃━┏┓┗┛╋╳▪▫◈◇◆●○".split("");
const pickGlitch = () =>
  GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

// Tiny scramble overlay — a grid of glitch characters that fades over the buddy
const GlitchOverlay = ({
  rows,
  cols,
  phase,
}: {
  rows: number;
  cols: number;
  phase: "dissolve" | "materialize";
}) => {
  const chars = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, i) => ({
        char: pickGlitch(),
        id: i,
        row: Math.floor(i / cols),
      })),
    [rows, cols]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid font-mono leading-none"
      style={{
        gridTemplateColumns: `repeat(${String(cols)}, 1ch)`,
        gridTemplateRows: `repeat(${String(rows)}, 1.4em)`,
        fontSize: "14px",
      }}
    >
      {chars.map((cell) => {
        const rowDelay =
          phase === "dissolve"
            ? cell.row * 0.018
            : (rows - 1 - cell.row) * 0.018;
        return (
          <motion.span
            animate={{
              opacity: phase === "dissolve" ? [0, 0.7, 0] : [0.7, 0.3, 0],
            }}
            className="text-black/40"
            key={cell.id}
            transition={{
              duration: phase === "dissolve" ? 0.18 : 0.22,
              delay: rowDelay,
              ease: "easeOut",
            }}
          >
            {cell.char}
          </motion.span>
        );
      })}
    </div>
  );
};

// ─── Teleport phases ─────────────────────────────────────────────────────────
type TeleportPhase = "idle" | "dissolve" | "travel" | "materialize" | "settled";

// Timing (ms) — kept tight so it feels snappy
const DISSOLVE_MS = 180;
const TRAVEL_MS = 60;
const MATERIALIZE_MS = 220;
const BUBBLE_DELAY_MS = 300;

interface HeroBuddyProps {
  stage: number;
}

export const HeroBuddy = ({ stage }: HeroBuddyProps) => {
  const [phase, setPhase] = useState<TeleportPhase>("idle");
  const [activePosition, setActivePosition] = useState(
    buddyStageConfig[0]?.position ?? ""
  );
  const [comment, setComment] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleKey, setBubbleKey] = useState(0);
  const [showGlitch, setShowGlitch] = useState<
    "dissolve" | "materialize" | null
  >(null);

  const prevStageRef = useRef<number | null>(null);
  const phaseRef = useRef<TeleportPhase>("idle");
  const timeoutChain = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();

  const config = buddyStageConfig[stage];

  // Keep phase in both state (for renders) and ref (for synchronous checks)
  const updatePhase = useCallback((p: TeleportPhase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

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
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-only effect — all deps are stable useCallbacks
  useEffect(() => {
    const initConfig = buddyStageConfig[0];
    setActivePosition(initConfig?.position ?? "");
    updatePhase("settled");
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
  }, []);

  // ── Teleport sequence — fires ONLY when stage changes ────────────────────
  // biome-ignore lint/correctness/useExhaustiveDependencies: only stage drives re-runs — other deps are stable useCallbacks/refs
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
    const wasMidTeleport =
      phaseRef.current !== "settled" && phaseRef.current !== "idle";
    prevStageRef.current = stage;
    clearTimeouts();
    setShowBubble(false);
    setShowGlitch(null);

    // Reduced motion OR rapid-scroll (mid-teleport) — instant swap, no animation
    if (reducedMotion || wasMidTeleport) {
      setActivePosition(targetConfig?.position ?? "");
      updatePhase("settled");
      const c = pickComment(targetConfig);
      setComment(c);
      setBubbleKey((k) => k + 1);
      if (c) {
        schedule(() => {
          setShowBubble(true);
        }, 120);
      }
      return;
    }

    // Phase 1: dissolve — glitch sweeps over, body collapses
    updatePhase("dissolve");
    setShowGlitch("dissolve");

    // Phase 2: travel — invisible, swap position
    schedule(() => {
      setShowGlitch(null);
      updatePhase("travel");
      setActivePosition(targetConfig?.position ?? "");
    }, DISSOLVE_MS);

    // Phase 3: materialize — body expands at new position
    schedule(() => {
      updatePhase("materialize");
      setShowGlitch("materialize");
    }, DISSOLVE_MS + TRAVEL_MS);

    // Phase 4: settled
    schedule(
      () => {
        setShowGlitch(null);
        updatePhase("settled");
      },
      DISSOLVE_MS + TRAVEL_MS + MATERIALIZE_MS
    );

    // Phase 5: speech bubble
    schedule(
      () => {
        const c = pickComment(targetConfig);
        setComment(c);
        setBubbleKey((k) => k + 1);
        if (c) {
          setShowBubble(true);
        }

        // Auto-hide bubble after 4-6s
        schedule(
          () => {
            setShowBubble(false);
          },
          4000 + Math.random() * 2000
        );
      },
      DISSOLVE_MS + TRAVEL_MS + MATERIALIZE_MS + BUBBLE_DELAY_MS
    );

    return () => {
      clearTimeouts();
    };
  }, [stage]);

  if (!config) {
    return null;
  }

  // ── Phase-driven motion values ────────────────────────────────────────────
  const getBodyAnimation = () => {
    if (phase === "dissolve") {
      return {
        opacity: 0,
        scaleY: 0.6,
        scaleX: 0.92,
        filter: "blur(2px)",
      };
    }
    if (phase === "travel") {
      return {
        opacity: 0,
        scaleY: 0.3,
        scaleX: 0.8,
        filter: "blur(4px)",
      };
    }
    return {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      filter: "blur(0px)",
    };
  };

  const getBodyTransition = () => {
    switch (phase) {
      case "dissolve":
        return {
          duration: DISSOLVE_MS / 1000,
          ease: [0.76, 0, 0.24, 1] as const,
        };
      case "travel":
        return {
          duration: 0,
        };
      case "materialize":
        return {
          duration: MATERIALIZE_MS / 1000,
          ease: [0.22, 1, 0.36, 1] as const,
        };
      default:
        return {
          type: "spring" as const,
          duration: 0.3,
          bounce: 0,
        };
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 hidden md:block",
        activePosition
      )}
    >
      {/* The buddy body — animated via phase */}
      <motion.div
        animate={getBodyAnimation()}
        className="pointer-events-auto relative origin-bottom"
        transition={getBodyTransition()}
      >
        {/* Glitch overlay — sweeps over buddy during dissolve/materialize */}
        <AnimatePresence>
          {showGlitch && (
            <motion.div
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 z-10"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={`glitch-${showGlitch}`}
              transition={{ duration: 0.08 }}
            >
              <GlitchOverlay cols={21} phase={showGlitch} rows={9} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The living ASCII buddy — never unmounted */}
        <AsciiBuddy
          expressionHint={config?.expressionHint}
          inView={phase === "settled" || phase === "idle"}
        />
      </motion.div>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && comment && phase === "settled" && (
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

import { motion } from "motion/react";
import { useMemo } from "react";

const LINES = [
  { prompt: "~", cmd: "git commit -m 'init'" },
  { prompt: "~", cmd: "bun run dev" },
  { prompt: "~", cmd: "tsc --watch" },
  { prompt: "~", cmd: "npm publish" },
  { prompt: "~", cmd: "ssh deploy@prod" },
  { prompt: "~", cmd: "docker compose up" },
  { prompt: "~", cmd: "curl -X POST /api" },
] as const;

export const CliTyping = () => {
  const rows = useMemo(
    () =>
      LINES.map((line, i) => ({
        ...line,
        id: `cli-${String(i)}`,
        delay: i * 1.6,
      })),
    []
  );

  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 px-6 py-4 font-mono text-[10px] text-black md:text-xs">
      {rows.map((row) => (
        <motion.div
          animate={{ opacity: [0, 0.35, 0.35, 0] }}
          className="flex items-center gap-1.5"
          key={row.id}
          transition={{
            duration: row.delay + 4,
            times: [0, 0.1, 0.7, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: (LINES.length - 1) * 1.6,
            delay: row.delay,
            ease: "linear",
          }}
        >
          <span className="opacity-50">{row.prompt}</span>
          <span className="opacity-60">$</span>
          <motion.span
            animate={{ opacity: [0, 0.4] }}
            transition={{
              delay: row.delay + 0.3,
              duration: 0.8,
              ease: "easeOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: (LINES.length - 1) * 1.6 + 3.2,
            }}
          >
            {row.cmd}
          </motion.span>
          {/* Blinking cursor */}
          <motion.span
            animate={{ opacity: [0.5, 0.5, 0, 0, 0.5] }}
            className="ml-0.5 inline-block h-3 w-[1px] bg-black"
            transition={{
              duration: 1,
              times: [0, 0.49, 0.5, 0.99, 1],
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

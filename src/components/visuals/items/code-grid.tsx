import { motion } from "motion/react";
import { useMemo } from "react";

const CHARS = "{}[]<>/;:.01+-=";
const COLS = 12;
const ROWS = 6;

export const CodeGrid = () => {
  const cells = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => ({
        id: `cell-${String(i)}`,
        char: CHARS[i % CHARS.length],
        delay: (i * 0.37) % 4,
        duration: 2 + ((i * 1.7) % 2),
      })),
    []
  );

  return (
    <div
      className="grid h-full w-full place-items-center font-mono text-fg text-xs"
      style={{
        gridTemplateColumns: `repeat(${String(COLS)}, 1fr)`,
        gridTemplateRows: `repeat(${String(ROWS)}, 1fr)`,
      }}
    >
      {cells.map((cell) => (
        <motion.span
          animate={{ opacity: [0, 0.12, 0] }}
          className="select-none"
          key={cell.id}
          transition={{
            duration: cell.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: cell.delay,
            ease: "easeInOut",
          }}
        >
          {cell.char}
        </motion.span>
      ))}
    </div>
  );
};

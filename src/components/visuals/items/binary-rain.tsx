import { motion } from "motion/react";
import { useMemo } from "react";

const COLS = 16;
const ROWS = 10;

export const BinaryRain = () => {
  const drops = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => ({
        id: `br-${String(i)}`,
        char: i % 3 === 0 ? "1" : "0",
        delay: ((i % COLS) * 0.6 + Math.floor(i / COLS) * 0.25) % 5,
        duration: 1.8 + ((i * 1.3) % 1.5),
      })),
    []
  );

  return (
    <div
      className="grid h-full w-full place-items-center font-mono text-black text-xs"
      style={{
        gridTemplateColumns: `repeat(${String(COLS)}, 1fr)`,
        gridTemplateRows: `repeat(${String(ROWS)}, 1fr)`,
      }}
    >
      {drops.map((drop) => (
        <motion.span
          animate={{ opacity: [0, 0.1, 0] }}
          className="select-none"
          key={drop.id}
          transition={{
            duration: drop.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: drop.delay,
            ease: "easeInOut",
          }}
        >
          {drop.char}
        </motion.span>
      ))}
    </div>
  );
};

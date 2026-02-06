import { motion } from "motion/react";

const LINES = 8;

export const ConvergingLines = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
    {Array.from({ length: LINES }, (_, i) => {
      const angle = (i / LINES) * 360;
      return (
        <motion.div
          animate={{ scaleX: [0, 1], opacity: [0, 0.08] }}
          className="absolute h-px w-full origin-center bg-black"
          key={`cl-${String(i)}`}
          style={{ rotate: `${String(angle)}deg` }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      );
    })}
    {/* Center convergence dot */}
    <motion.div
      animate={{ scale: [0, 1], opacity: [0, 0.15] }}
      className="absolute h-2 w-2 rounded-full bg-black"
      transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
    />
  </div>
);

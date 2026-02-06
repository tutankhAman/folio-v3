import { motion } from "motion/react";
import { useMemo } from "react";

const BAR_COUNT = 12;

export const GlitchLines = () => {
  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        id: `gl-${String(i)}`,
        top: `${String(8 + ((i * 73) % 84))}%`,
        width: `${String(15 + ((i * 37) % 50))}%`,
        left: `${String((i * 41) % 60)}%`,
        delay: (i * 0.4) % 3,
        duration: 0.15 + ((i * 0.13) % 0.3),
      })),
    []
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      {bars.map((bar) => (
        <motion.div
          animate={{ opacity: [0, 0.08, 0, 0.06, 0] }}
          className="absolute h-px bg-black"
          key={bar.id}
          style={{ top: bar.top, left: bar.left, width: bar.width }}
          transition={{
            duration: bar.duration + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: bar.delay,
            repeatDelay: 1.5 + ((bar.delay * 2) % 3),
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

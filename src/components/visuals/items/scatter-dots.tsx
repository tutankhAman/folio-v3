import { motion } from "motion/react";
import { useMemo } from "react";

const SHAPES = ["circle", "square", "triangle"] as const;
const COUNT = 14;

export const ScatterDots = () => {
  const items = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: `sd-${String(i)}`,
        shape: SHAPES[i % SHAPES.length],
        x: `${String(5 + ((i * 67) % 85))}%`,
        y: `${String(5 + ((i * 43) % 85))}%`,
        size: 3 + ((i * 2.7) % 5),
        delay: i * 0.12,
        rotate: (i * 30) % 360,
      })),
    []
  );

  return (
    <div className="relative h-full w-full">
      {items.map((item) => (
        <motion.div
          animate={{ opacity: 0.1, scale: 1 }}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          key={item.id}
          style={{ left: item.x, top: item.y }}
          transition={{
            delay: item.delay,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {item.shape === "circle" && (
            <div
              className="rounded-full border border-black"
              style={{
                width: item.size,
                height: item.size,
              }}
            />
          )}
          {item.shape === "square" && (
            <div
              className="border border-black"
              style={{
                width: item.size,
                height: item.size,
                rotate: `${String(item.rotate)}deg`,
              }}
            />
          )}
          {item.shape === "triangle" && (
            <svg
              aria-label="Triangle"
              height={item.size}
              role="img"
              style={{ rotate: `${String(item.rotate)}deg` }}
              viewBox="0 0 10 10"
              width={item.size}
            >
              <polygon
                fill="none"
                points="5,1 9,9 1,9"
                stroke="black"
                strokeWidth={1}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

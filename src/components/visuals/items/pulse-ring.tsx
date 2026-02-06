import { motion } from "motion/react";

export const PulseRing = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    {/* Center dot */}
    <div className="absolute h-1.5 w-1.5 rounded-full bg-black opacity-25" />

    {/* Ring 1 */}
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.18, 0] }}
      className="absolute h-8 w-8 rounded-full border border-black"
      transition={{
        duration: 3,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.5,
      }}
    />

    {/* Ring 2 — staggered */}
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.14, 0] }}
      className="absolute h-8 w-8 rounded-full border border-black"
      transition={{
        duration: 3,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        delay: 1,
        repeatDelay: 0.5,
      }}
    />

    {/* Ring 3 */}
    <motion.div
      animate={{ scale: [1, 2.5], opacity: [0.1, 0] }}
      className="absolute h-8 w-8 rounded-full border border-black"
      transition={{
        duration: 3,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
        delay: 2,
        repeatDelay: 0.5,
      }}
    />
  </div>
);

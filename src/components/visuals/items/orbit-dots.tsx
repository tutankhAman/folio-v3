import { motion } from "motion/react";

export const OrbitDots = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    {/* Center anchor */}
    <div className="absolute h-1 w-1 rounded-full bg-black opacity-15" />

    {/* Faint orbit rings */}
    <div className="absolute h-28 w-28 rounded-full border border-black/[0.04]" />
    <div className="absolute h-44 w-44 rounded-full border border-black/[0.03]" />

    {/* Dot 1 — inner orbit */}
    <motion.div
      animate={{ rotate: 360 }}
      className="absolute h-28 w-28"
      transition={{
        duration: 6,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <div className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-black opacity-15" />
    </motion.div>

    {/* Dot 2 — outer orbit */}
    <motion.div
      animate={{ rotate: -360 }}
      className="absolute h-44 w-44"
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <div className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-black opacity-10" />
    </motion.div>
  </div>
);

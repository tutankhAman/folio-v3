import { motion } from "motion/react";

export const Crosshair = () => (
  <div className="relative flex h-full w-full items-center justify-center">
    {/* Horizontal line */}
    <motion.div
      animate={{ scaleX: 1, opacity: 0.1 }}
      className="absolute h-px w-full bg-black"
      initial={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />

    {/* Vertical line */}
    <motion.div
      animate={{ scaleY: 1, opacity: 0.1 }}
      className="absolute h-full w-px bg-black"
      initial={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
    />

    {/* Center ring */}
    <motion.div
      animate={{ scale: 1, opacity: 0.12 }}
      className="absolute h-6 w-6 rounded-full border border-black"
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    />

    {/* Inner dot */}
    <motion.div
      animate={{ scale: 1, opacity: 0.15 }}
      className="absolute h-1 w-1 rounded-full bg-black"
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
    />
  </div>
);

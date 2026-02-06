import { motion } from "motion/react";

export const FlowingWave = () => (
  <div className="flex h-full w-full items-center overflow-hidden">
    <motion.svg
      animate={{ x: "-50%" }}
      aria-label="Flowing wave"
      className="h-32 w-[200%]"
      initial={{ x: "0%" }}
      preserveAspectRatio="none"
      role="img"
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      viewBox="0 0 2400 200"
    >
      <path
        d="M0,100 Q150,30 300,100 T600,100 T900,100 T1200,100 T1500,100 T1800,100 T2100,100 T2400,100"
        fill="none"
        opacity={0.12}
        stroke="black"
        strokeWidth={1.5}
      />
      <path
        d="M0,115 Q150,50 300,115 T600,115 T900,115 T1200,115 T1500,115 T1800,115 T2100,115 T2400,115"
        fill="none"
        opacity={0.07}
        stroke="black"
        strokeWidth={0.75}
      />
    </motion.svg>
  </div>
);

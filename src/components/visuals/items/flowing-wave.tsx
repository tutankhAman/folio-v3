import { motion } from "motion/react";

export const FlowingWave = () => (
  <div className="h-full w-full overflow-hidden">
    <motion.div
      animate={{ x: "-50%" }}
      className="flex h-full w-[200%] items-center"
      initial={{ x: "0%" }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
    >
      <WaveSvg />
      <WaveSvg />
    </motion.div>
  </div>
);

const WaveSvg = () => (
  <svg
    aria-label="Flowing wave"
    className="h-32 w-1/2 shrink-0"
    preserveAspectRatio="none"
    role="img"
    viewBox="0 0 1200 200"
  >
    <path
      d="M0,100 Q150,30 300,100 T600,100 T900,100 T1200,100"
      fill="none"
      opacity={0.12}
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <path
      d="M0,115 Q150,50 300,115 T600,115 T900,115 T1200,115"
      fill="none"
      opacity={0.07}
      stroke="currentColor"
      strokeWidth={0.75}
    />
  </svg>
);

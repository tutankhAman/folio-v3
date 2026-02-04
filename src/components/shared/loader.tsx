import { type Easing, motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const [step, setStep] = useState(0);

  // Easing definition
  const ease: Easing = [0.76, 0, 0.24, 1];

  const transition: Transition = {
    duration: 1,
    ease,
  };

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Initial A (handled by initial state)

      // Step 1: Second A slides down (Wait 1s)
      await new Promise((r) => setTimeout(r, 1000));
      setStep(1);

      // Step 2: M and N slide right (Wait 1s)
      await new Promise((r) => setTimeout(r, 1000));
      setStep(2);

      // Step 3: Bottom line AN slides next to AM (Wait 1.5s)
      await new Promise((r) => setTimeout(r, 1500));
      setStep(3);

      // Wait for final animation to complete + some hold time
      await new Promise((r) => setTimeout(r, 1500));
      onComplete?.();
    };

    sequence();
  }, [onComplete]);

  const getY = () => {
    if (step === 3) {
      return "-100%";
    }
    if (step >= 1) {
      return "0%";
    }
    return "-50px";
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden text-black">
      {/* Main Container */}
      <motion.div
        animate={{
          y: step === 3 ? "25%" : "0%",
          x: step === 3 ? "0.11em" : "0%",
        }}
        className="flex flex-col items-center font-generalsans font-semibold text-base leading-none tracking-tighter"
        transition={transition}
      >
        {/* Top Group: AM */}
        <motion.div
          animate={{ x: step === 3 ? "-50%" : "0%" }}
          className="relative z-10 flex"
          transition={transition}
        >
          <motion.span layout>A</motion.span>

          {/* M */}
          <motion.div
            animate={{
              width: step >= 2 ? "auto" : 0,
              opacity: step >= 2 ? 1 : 0,
              x: step >= 2 ? 0 : -20,
            }}
            initial={{ width: 0, opacity: 0, x: -20 }}
            style={{ overflow: "hidden", display: "flex" }}
            transition={transition}
          >
            <span className="block pl-[0.05em]">M</span>
          </motion.div>
        </motion.div>

        {/* Bottom Group: AN */}
        <motion.div
          animate={{
            height: step >= 1 ? "auto" : 0,
            opacity: step >= 1 ? 1 : 0,
            y: getY(),
            x: step === 3 ? "50%" : "0%",
          }}
          className="relative z-0 flex"
          initial={{ height: 0, opacity: 0, y: -50 }}
          style={{ overflow: "hidden" }}
          transition={transition}
        >
          <motion.span layout>A</motion.span>

          {/* N */}
          <motion.div
            animate={{
              width: step >= 2 ? "auto" : 0,
              opacity: step >= 2 ? 1 : 0,
              x: step >= 2 ? 0 : -20,
            }}
            initial={{ width: 0, opacity: 0, x: -20 }}
            style={{ overflow: "hidden", display: "flex" }}
            transition={transition}
          >
            <span className="block pl-[0.05em]">N</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

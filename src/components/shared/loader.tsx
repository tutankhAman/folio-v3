import { type Easing, motion, type Transition } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/** Computes the Y translation for the bottom group based on step */
function computeY(step: number) {
  if (step >= 3) {
    return "-100%";
  }
  if (step >= 1) {
    return "0%";
  }
  return "-50px";
}

/** Computes the X translation for the main container based on step */
function computeX(step: number) {
  if (step === 4 || step === 5) {
    return "40px";
  }
  if (step >= 3) {
    return "0.11em";
  }
  return "0%";
}

/** Builds the blur/scale values for a letter based on visibility */
function letterStyle(isVisible: boolean) {
  return {
    filter: isVisible ? "blur(0px)" : "blur(6px)",
    scale: isVisible ? 1 : 0.85,
  };
}

export const Loader = ({ onComplete }: { onComplete?: () => void }) => {
  const [step, setStep] = useState(0);

  const ease: Easing = [0.76, 0, 0.24, 1];

  const transition: Transition = {
    duration: 1,
    ease,
  };

  // Progress
  const totalSteps = 5;
  const progress = Math.min((step / totalSteps) * 100, 100);

  // Derived motion values
  const mainY = step >= 3 ? "25%" : "0%";
  const mainX = useMemo(() => computeX(step), [step]);
  const bottomY = useMemo(() => computeY(step), [step]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(1);

      await new Promise((r) => setTimeout(r, 1000));
      setStep(2);

      await new Promise((r) => setTimeout(r, 1500));
      setStep(3);

      await new Promise((r) => setTimeout(r, 1500));
      setStep(4);

      await new Promise((r) => setTimeout(r, 500));
      setStep(5);
      await new Promise((r) => setTimeout(r, 200));
      onComplete?.();
    };

    sequence();
  }, [onComplete]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden text-white">
      {/* Main Container */}
      <motion.div
        animate={{ y: mainY, x: mainX }}
        className="relative z-10 flex flex-col items-center font-medium font-satoshi text-xl leading-none tracking-tighter"
        transition={transition}
      >
        {/* Top Group: AM */}
        <motion.div
          animate={{ x: step >= 3 ? "-50%" : "0%" }}
          className="relative z-10 flex"
          transition={transition}
        >
          <motion.span
            animate={letterStyle(true)}
            initial={{ filter: "blur(4px)", scale: 0.9 }}
            layout
            transition={{ duration: 0.6, ease }}
          >
            A
          </motion.span>

          <motion.div
            animate={{
              width: step >= 2 ? "auto" : 0,
              opacity: step >= 2 ? 1 : 0,
              x: step >= 2 ? 0 : -20,
              ...letterStyle(step >= 2),
            }}
            initial={{
              width: 0,
              opacity: 0,
              x: -20,
              filter: "blur(6px)",
              scale: 0.85,
            }}
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
            y: bottomY,
            x: step >= 3 ? "50%" : "0%",
          }}
          className="relative z-0 flex"
          initial={{ height: 0, opacity: 0, y: -50 }}
          style={{ overflow: "hidden" }}
          transition={transition}
        >
          <motion.span
            animate={letterStyle(step >= 1)}
            initial={{ filter: "blur(6px)", scale: 0.85 }}
            layout
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            A
          </motion.span>

          <motion.div
            animate={{
              width: step >= 2 ? "auto" : 0,
              opacity: step >= 2 ? 1 : 0,
              x: step >= 2 ? 0 : -20,
              ...letterStyle(step >= 2),
            }}
            initial={{
              width: 0,
              opacity: 0,
              x: -20,
              filter: "blur(6px)",
              scale: 0.85,
            }}
            style={{ overflow: "hidden", display: "flex" }}
            transition={transition}
          >
            <span className="block pl-[0.05em]">N</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <ProgressBar ease={ease} progress={progress} step={step} />
    </div>
  );
};

/* ─── Sub-components ──────────────────────────────────────────── */

function ProgressBar({
  progress,
  step,
  ease,
}: {
  progress: number;
  step: number;
  ease: Easing;
}) {
  return (
    <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2">
      <motion.div
        animate={{ opacity: step < 5 ? 1 : 0 }}
        className="relative h-[1px] w-16 overflow-hidden rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full rounded-full bg-white/50"
          initial={{ width: "0%" }}
          transition={{ duration: 0.8, ease }}
        />
      </motion.div>
    </div>
  );
}

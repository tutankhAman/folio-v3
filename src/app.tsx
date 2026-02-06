import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HeroSection } from "./components/homepage/hero.section";
import { Loader } from "./components/shared/loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen w-full bg-white">
      {/* Hero Section is always rendered but revealed */}
      <div className="relative z-0">
        <HeroSection />
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            exit={
              {
                maskImage:
                  "radial-gradient(circle at center, transparent 150%, black 150%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, transparent 150%, black 150%)",
              } as Record<string, string>
            }
            initial={
              {
                maskImage:
                  "radial-gradient(circle at center, transparent 0%, black 0%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, transparent 0%, black 0%)",
              } as Record<string, string>
            }
            key="loader"
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;

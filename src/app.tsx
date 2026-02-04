import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AmanLoader } from "./components/aman-loader";
import { HeroSection } from "./components/homepage/hero.section";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, y: -20 }}
            key="loader"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AmanLoader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroSection />
        </motion.div>
      )}
    </main>
  );
}

export default App;

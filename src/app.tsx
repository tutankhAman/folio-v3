import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HeroSection } from "./components/homepage/hero.section";
import { Footer } from "./components/shared/footer";
import { Loader } from "./components/shared/loader";
import { Navbar } from "./components/shared/navbar";
import { ProjectModal } from "./components/shared/project-modal";
import type { Project } from "./data/projects";
import ResumePage from "./pages/resume";
import TestPage from "./pages/test";

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-surface text-fg transition-colors duration-300">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
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

      {/* Navbar — always visible, z-40 */}
      {!loading && <Navbar />}

      <div className="relative z-0">
        <Routes>
          <Route
            element={
              <>
                <HeroSection onProjectClick={handleProjectClick} />
                <Footer onProjectClick={handleProjectClick} />
              </>
            }
            path="/"
          />
          <Route element={<TestPage />} path="/test" />
          <Route element={<ResumePage />} path="/resume" />
        </Routes>
      </div>

      {/* Project modal overlay */}
      <ProjectModal onClose={handleCloseModal} project={selectedProject} />
    </main>
  );
}

export default App;

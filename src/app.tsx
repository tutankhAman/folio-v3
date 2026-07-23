import { Analytics } from "@vercel/analytics/react";
import { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HeroSection } from "./components/homepage/hero.section";
import { Footer } from "./components/shared/footer";
import { Navbar } from "./components/shared/navbar";
import { ProjectModal } from "./components/shared/project-modal";
import { SmoothScroll } from "./components/shared/smooth-scroll";
import type { Project } from "./data/projects";
import TestPage from "./pages/test";
import ResumePage from "./pages/tldr";

function App() {
  // Loader disabled during development mode
  const [_loading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-surface text-fg transition-colors duration-300">
      <SmoothScroll />

      {/* Loader commented out for dev mode */}
      {/* <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black will-change-[mask-image,transform,filter]"
            key="loader"
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Navbar — always visible, z-40 */}
      <Navbar />

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
      <Analytics />
    </main>
  );
}

export default App;

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HeroSection } from "./components/homepage/hero.section";
import { Footer } from "./components/shared/footer";
import { Loader } from "./components/shared/loader";
import { Navbar } from "./components/shared/navbar";
import { ProjectModal } from "./components/shared/project-modal";
import { Seo } from "./components/shared/seo";
import { SmoothScroll } from "./components/shared/smooth-scroll";
import type { Project } from "./data/projects";
import { personSchema } from "./data/seo";
import NotFoundPage from "./pages/not-found";
import TestPage from "./pages/test";
import ResumePage from "./pages/tldr";

function App() {
  const location = useLocation();
  // Skip the intro loader when the page is being prerendered by react-snap
  // (it identifies itself via the user agent), so the static HTML snapshot
  // contains the real content for crawlers instead of the loader overlay.
  const isPrerendering =
    typeof navigator !== "undefined" &&
    navigator.userAgent.includes("ReactSnap");
  const [loading, setLoading] = useState(
    !isPrerendering && location.pathname === "/"
  );
  const [pageRevealComplete, setPageRevealComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <main className="relative min-h-screen w-full bg-surface text-fg transition-colors duration-300">
      <SmoothScroll />

      {isHome && (
        <Seo
          description="Designing systems that feel inevitable. Clean interfaces. Brutal efficiency. Code and aesthetics locked together, built to scale, built to last."
          jsonLd={[personSchema()]}
          path="/"
          title="Aman Aziz — Systems & Interfaces"
        />
      )}

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-surface text-fg will-change-[mask-image,transform,filter]"
            exit={
              {
                maskImage:
                  "radial-gradient(ellipse 160% 160% at center, transparent 50%, black 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 160% 160% at center, transparent 50%, black 80%)",
                scale: 1.08,
                filter: "blur(4px)",
              } as Record<string, string | number>
            }
            initial={
              {
                maskImage:
                  "radial-gradient(ellipse 0% 0% at center, transparent 50%, black 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 0% 0% at center, transparent 50%, black 80%)",
                scale: 1,
                filter: "blur(0px)",
              } as Record<string, string | number>
            }
            key="loader"
            transition={{
              duration: 1.6,
              ease: [0.65, 0, 0.35, 1],
              filter: { duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] },
              scale: { duration: 1.8, ease: [0.33, 1, 0.68, 1] },
            }}
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          onAnimationComplete={() => setPageRevealComplete(true)}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Navbar — z-40 */}
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
              <Route
                element={<ResumePage isLoaderComplete={pageRevealComplete} />}
                path="/tldr"
              />
              <Route element={<NotFoundPage />} path="*" />
            </Routes>
          </div>
        </motion.div>
      )}

      {/* Project modal overlay */}
      <ProjectModal onClose={handleCloseModal} project={selectedProject} />
    </main>
  );
}

export default App;

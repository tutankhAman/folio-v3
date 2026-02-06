import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect } from "react";
import type { Project } from "../../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [project, handleEscape]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-end justify-center md:items-center"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Backdrop — always dark overlay */}
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.4 }}
          />

          {/* Modal panel — slides up from bottom */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden bg-surface md:max-h-[85vh]"
            exit={{ y: "100%", opacity: 0 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
          >
            {/* Drag indicator — mobile */}
            <div className="flex justify-center pt-3 pb-0 md:hidden">
              <div className="h-1 w-10 bg-fg/10" />
            </div>

            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center bg-surface text-fg/40 transition-colors duration-200 hover:bg-fg/10 hover:text-fg/70"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                fill="none"
                height="14"
                role="img"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                viewBox="0 0 14 14"
                width="14"
              >
                <title>Close</title>
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </motion.button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Hero thumbnail */}
              <motion.div
                animate={{ scale: 1, opacity: 1 }}
                className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted"
                initial={{ scale: 1.1, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.1,
                }}
              >
                <img
                  alt={project.name}
                  className="h-full w-full object-cover"
                  height={500}
                  src={project.thumbnail}
                  width={800}
                />
              </motion.div>

              {/* Content */}
              <div className="px-6 pt-4 pb-8 md:px-8">
                {/* Header row */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                  initial={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <div className="mb-2 flex items-baseline gap-3">
                    <h2 className="font-generalsans font-semibold text-2xl text-fg tracking-tight md:text-3xl">
                      {project.name}
                    </h2>
                    <span className="font-mono text-[11px] text-fg/25 uppercase tracking-wider">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-fg/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-fg/40 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-fg/20">•</span>
                    <span className="font-mono text-[11px] text-fg/30">
                      {project.role}
                    </span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 max-w-lg font-satoshi text-[15px] text-fg/50 leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {project.description}
                </motion.p>

                {/* Divider */}
                <motion.div
                  animate={{ scaleX: 1 }}
                  className="mb-6 border-fg/[0.08] border-t border-dashed"
                  initial={{ scaleX: 0 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                />

                {/* Tech stack */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="mb-3 block font-generalsans font-medium text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <motion.span
                        animate={{ opacity: 1, scale: 1 }}
                        className="border border-fg/[0.06] bg-surface-subtle px-2.5 py-1 font-mono text-[11px] text-fg/40"
                        initial={{ opacity: 0, scale: 0.8 }}
                        key={t}
                        transition={{
                          duration: 0.3,
                          delay: 0.35 + i * 0.04,
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Links */}
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {project.links.map((link, i) => (
                    <motion.a
                      className={`group inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-[12px] tracking-wide transition-all duration-200${
                        i === 0
                          ? "bg-fg text-surface hover:bg-fg/80"
                          : "border border-fg/[0.08] bg-transparent text-fg/50 hover:border-fg/20 hover:text-fg"
                      }`}
                      href={link.href}
                      key={link.label}
                      rel="noopener noreferrer"
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                      <svg
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        role="img"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 12 12"
                      >
                        <title>External link</title>
                        <path d="M2 10L10 2M10 2H4M10 2v6" />
                      </svg>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

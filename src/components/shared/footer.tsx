import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projects";
import { nameToProject } from "../../data/projects";
import { AsciiBuddy } from "./ascii-buddy";

// ─── Footer Data ─────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/tutankhAman" },
  { label: "Twitter / X", href: "https://x.com/amancooks" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aman-aziz" },
  { label: "Instagram", href: "https://instagram.com/rxse_s__" },
];

const PROJECTS = [
  { label: "Larity", description: "AI assistant" },
  { label: "Singularity Works", description: "Company" },
  { label: "Allround", description: "Web platform" },
  { label: "Oryx", description: "Web platform" },
  { label: "Verq", description: "AI software" },
];

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const LocalTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time || "--:--:--"}</span>;
};

const StaggeredLine = ({
  children,
  index,
  inView,
}: {
  children: React.ReactNode;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    initial={{ opacity: 0, y: 12 }}
    transition={{
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.05,
    }}
  >
    {children}
  </motion.div>
);

// ─── Footer ──────────────────────────────────────────────────────────────────

interface FooterProps {
  onProjectClick?: (project: Project) => void;
}

export const Footer = ({ onProjectClick }: FooterProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer
      className="relative w-full overflow-hidden bg-white text-black"
      ref={footerRef}
    >
      {/* Thin top border */}
      <div className="mx-auto w-[calc(100%-2rem)] border-black/[0.08] border-t border-dashed" />

      {/* Main content grid */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 md:px-10">
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-x-8">
          {/* Column 1 — Socials */}
          <div className="flex flex-col gap-5">
            <StaggeredLine index={0} inView={inView}>
              <span className="font-generalsans font-medium text-[11px] text-black/30 uppercase tracking-[0.2em]">
                Connect
              </span>
            </StaggeredLine>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s, i) => (
                <StaggeredLine index={i + 1} inView={inView} key={s.label}>
                  <a
                    className="group flex items-center gap-2 font-mono text-[13px] text-black/50 transition-colors duration-300 hover:text-black"
                    href={s.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="inline-block h-px w-0 bg-black transition-all duration-300 group-hover:w-4" />
                    {s.label}
                  </a>
                </StaggeredLine>
              ))}
            </div>
          </div>

          {/* Column 2 — Projects */}
          <div className="flex flex-col gap-5">
            <StaggeredLine index={0} inView={inView}>
              <span className="font-generalsans font-medium text-[11px] text-black/30 uppercase tracking-[0.2em]">
                Selected Work
              </span>
            </StaggeredLine>
            <div className="flex flex-col gap-3">
              {PROJECTS.map((p, i) => {
                const project = nameToProject.get(p.label.toLowerCase());
                const isClickable = !!project && !!onProjectClick;

                return (
                  <StaggeredLine index={i + 1} inView={inView} key={p.label}>
                    {isClickable ? (
                      <button
                        className="group flex cursor-pointer items-baseline gap-0 border-none bg-transparent p-0 text-left"
                        onClick={() => onProjectClick(project)}
                        type="button"
                      >
                        <span className="font-mono text-[13px] text-black/50 transition-colors duration-300 group-hover:text-black">
                          {p.label}
                        </span>
                        <span className="ml-2 font-mono text-[10px] text-black/20 transition-colors duration-300 group-hover:text-black/40">
                          {p.description}
                        </span>
                      </button>
                    ) : (
                      <div className="group">
                        <span className="font-mono text-[13px] text-black/50 transition-colors duration-300 group-hover:text-black">
                          {p.label}
                        </span>
                        <span className="ml-2 font-mono text-[10px] text-black/20 transition-colors duration-300 group-hover:text-black/40">
                          {p.description}
                        </span>
                      </div>
                    )}
                  </StaggeredLine>
                );
              })}
            </div>
          </div>

          {/* Column 3 — Navigation */}
          <div className="flex flex-col gap-5">
            <StaggeredLine index={0} inView={inView}>
              <span className="font-generalsans font-medium text-[11px] text-black/30 uppercase tracking-[0.2em]">
                Navigation
              </span>
            </StaggeredLine>
            <div className="flex flex-col gap-3">
              {SITE_LINKS.map((l, i) => (
                <StaggeredLine index={i + 1} inView={inView} key={l.label}>
                  <a
                    className="group flex items-center gap-2 font-mono text-[13px] text-black/50 transition-colors duration-300 hover:text-black"
                    href={l.href}
                  >
                    <span className="inline-block h-px w-0 bg-black transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </StaggeredLine>
              ))}
            </div>
          </div>

          {/* Column 4 — Status / Info */}
          <div className="flex flex-col gap-5">
            <StaggeredLine index={0} inView={inView}>
              <span className="font-generalsans font-medium text-[11px] text-black/30 uppercase tracking-[0.2em]">
                Status
              </span>
            </StaggeredLine>
            <div className="flex flex-col gap-4">
              <StaggeredLine index={1} inView={inView}>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-black/25 uppercase tracking-[0.15em]">
                    Local Time — IST
                  </span>
                  <span className="font-mono text-[13px] text-black/50 tabular-nums">
                    <LocalTime />
                  </span>
                </div>
              </StaggeredLine>
              <StaggeredLine index={2} inView={inView}>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-black/25 uppercase tracking-[0.15em]">
                    Availability
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[13px] text-black/50">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/20" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black/40" />
                    </span>
                    Open to work
                  </span>
                </div>
              </StaggeredLine>
              <StaggeredLine index={3} inView={inView}>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-black/25 uppercase tracking-[0.15em]">
                    Email
                  </span>
                  <a
                    className="font-mono text-[13px] text-black/50 transition-colors duration-300 hover:text-black"
                    href="mailto:aman@itssingularity.com"
                  >
                    aman@itssingularity.com
                  </a>
                </div>
              </StaggeredLine>
            </div>
          </div>
        </div>
      </div>

      {/* ASCII Buddy — the interactive centerpiece */}
      <div className="mx-auto flex max-w-7xl items-end justify-between px-6 pt-8 pb-4 md:px-10">
        <motion.div
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          transition={{
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3,
          }}
        >
          <h2 className="select-none font-generalsans font-light text-[clamp(80px,20vw,280px)] text-black leading-[0.85] tracking-tighter">
            Aman.
          </h2>
        </motion.div>
        <div className="mb-2 hidden md:block">
          <AsciiBuddy inView={inView} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-2 border-black/[0.06] border-t border-dashed py-5">
          <motion.div
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center"
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.5,
            }}
          >
            <span className="font-mono text-[11px] text-black/25">
              &copy; {new Date().getFullYear()} Aman. All rights reserved.
            </span>
            {/* Mobile buddy — stacked below copyright */}
            <div className="block md:hidden">
              <AsciiBuddy inView={inView} />
            </div>
            <span className="font-mono text-[11px] text-black/25">
              Designed & built with intention
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

import { AnimatePresence, motion, useInView } from "motion/react";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AsciiBuddy } from "@/components/shared/ascii-buddy";
import { Footer } from "@/components/shared/footer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = {
  languages: ["Python", "C++", "JavaScript", "TypeScript"],
  frontend: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  backend: ["Node.js", "Express.js"],
  cloud: ["MongoDB", "NeonDB", "AWS", "Cloudflare"],
  design: ["Figma", "Adobe XD", "Canva", "Miro"],
  tools: [
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Jupyter Notebook",
    "LangChain",
    "LangGraph",
  ],
};

const EXPERIENCE = {
  company: "Singularity Works",
  role: "Co-Founder",
  period: "Jan 2025 – Present",
  location: "Remote",
  points: [
    "Led global clients end-to-end through design and frontend development, including those with zero technical background.",
    "Translated unclear requirements into precise UX flows, refined UI, and optimized frontend systems.",
    "Delivered 5 high-impact projects with a 4.8+ rating and generated six-figure revenue within the first two months.",
  ],
};

const EDUCATION = {
  institution: "Vellore Institute of Technology",
  degree: "B.Tech, Computer Science and Engineering",
  period: "Sep 2023 – Present",
  location: "Bhopal, MP",
};

const PROJECTS = [
  {
    name: "Larity",
    tagline: "AI Assistant",
    category: "AI / Product",
    year: "2024",
    role: "Design & Development",
    tech: ["React", "TypeScript", "Node.js", "OpenAI", "Tailwind CSS"],
    link: "#",
    repo: "https://github.com/tutankhAman",
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314928/larity_zckjoh.png",
    points: [
      "An intelligent AI assistant designed to streamline workflows and enhance productivity.",
      "Combines natural language understanding with a clean, intuitive interface to make AI accessible to everyone.",
    ],
  },
  {
    name: "VerQ",
    tagline: "AI-Powered Interview Buddy",
    category: "AI / Software",
    year: "2024",
    role: "Design & Development",
    tech: ["React", "TypeScript", "Python", "OpenAI", "Tailwind CSS"],
    link: "https://verq.live",
    repo: "https://github.com/tutankhAman/verq",
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314865/verq_nxcqwm.png",
    points: [
      "Built a MERN-based platform that generates resume-driven interview questions, records voice responses, and provides AI-powered feedback using Gemini and Deepgram APIs.",
      "Attained 1,200+ page views and 80+ users in the span of two days.",
      "Integrated real-time transcription, text-to-speech, and voice analysis features.",
    ],
  },
  {
    name: "Arkaiv",
    tagline: "AI Weekly Digest",
    category: "AI / Platform",
    year: "2024",
    role: "Full-stack Development",
    tech: ["React", "Node.js", "OpenAI", "BART", "Web Scraping"],
    link: "https://arkaiv.live",
    repo: "https://github.com/tutankhAman/arkaiv",
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314928/larity_zckjoh.png",
    points: [
      "Developed a full-stack platform to track, summarize, and visualize the latest AI tools from GitHub, Hugging Face, and arXiv using web scraping and NLP models.",
      "Built daily web-scrapers and automated AI summarization using BART and OpenAI APIs.",
      "Implemented a customizable daily email digest system with analytics and unsubscribe flow.",
    ],
  },
  {
    name: "Allround",
    tagline: "Web Platform",
    category: "Web Platform",
    year: "2024",
    role: "Design & Development",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    link: "#",
    repo: "https://github.com/tutankhAman",
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314930/allorund_neggya.png",
    points: [
      "A comprehensive web platform built for seamless user experiences with clean architecture and fluid interactions.",
      "Focused on delivering a polished product with attention to performance and design quality.",
    ],
  },
  {
    name: "Oryx",
    tagline: "Web Platform",
    category: "Web Platform",
    year: "2024",
    role: "Design & Development",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    link: "#",
    repo: "https://github.com/tutankhAman",
    image:
      "https://res.cloudinary.com/dojj6zxs3/image/upload/f_auto,q_auto,dpr_auto,fl_progressive/v1770314896/oryx_gtronv.png",
    points: [
      "A modern web platform designed with precision and care, emphasizing performance and design quality.",
      "Creating an experience that feels effortless through meticulous attention to detail.",
    ],
  },
];

const CERTIFICATIONS = [
  "Frontend Development (React)",
  "Backend Development (Node.js, Express.js)",
  "Python for Data Science and AI",
  "Python and Flask",
  "Django with SQL and Databases",
  "Git and GitHub",
  "Cloud Computing",
  "Introduction to Software Engineering",
  "HTML, CSS, and Javascript",
];

const NPTEL_CERTS = [
  "Introduction to Japanese Language and Culture",
  "Introduction to Machine Learning",
];

const ACHIEVEMENTS = [
  "Won 2x Development Hackathons",
  "Won 1x UI/UX Hackathon",
  "4-Stars Python on HackerRank",
  "Active contributor: AsyncAPI, LangChain",
];

const LANGUAGES_SPOKEN = ["English", "Japanese (N5)", "Hindi"];

const SOFT_SKILLS = [
  "Leadership",
  "Team Management",
  "Problem-Solving",
  "Rapid Development",
];

// ─── Cursor-attached image hook ───────────────────────────────────────────────

function useCursorImage() {
  const [active, setActive] = useState<{
    src: string;
    x: number;
    y: number;
  } | null>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });

  const onEnter = useCallback((src: string, e: ReactMouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    setActive({ src, x: e.clientX, y: e.clientY });
  }, []);

  const onMove = useCallback((e: ReactMouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setActive((prev) =>
        prev ? { ...prev, x: posRef.current.x, y: posRef.current.y } : null
      );
    });
  }, []);

  const onLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setActive(null);
  }, []);

  return { active, onEnter, onMove, onLeave };
}

// ─── Section Label ────────────────────────────────────────────────────────────

const SectionLabel = ({
  children,
  index,
  inView,
}: {
  children: React.ReactNode;
  index: number;
  inView: boolean;
}) => (
  <motion.div
    animate={inView ? { opacity: 1, y: 0 } : {}}
    className="mb-6 flex items-center gap-3"
    initial={{ opacity: 0, y: 16 }}
    transition={{
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 + index * 0.06,
    }}
  >
    <span className="font-mono text-[10px] text-fg/20 uppercase tracking-[0.2em]">
      {String(index).padStart(2, "0")}
    </span>
    <span className="h-px flex-1 bg-fg/[0.08]" />
    <span className="font-generalsans font-medium text-[11px] text-fg/30 uppercase tracking-[0.2em]">
      {children}
    </span>
  </motion.div>
);

// ─── Stagger wrapper ──────────────────────────────────────────────────────────

const Reveal = ({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) => (
  <motion.div
    animate={inView ? { opacity: 1, y: 0 } : {}}
    initial={{ opacity: 0, y: 14 }}
    transition={{
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1],
      delay,
    }}
  >
    {children}
  </motion.div>
);

// ─── Skill Tag ────────────────────────────────────────────────────────────────

const SkillTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block border border-fg/[0.08] border-dashed px-2.5 py-1 font-mono text-[11px] text-fg/50 transition-colors duration-300 hover:border-fg/20 hover:text-fg/80">
    {children}
  </span>
);

// ─── Project Item (with hover image) ──────────────────────────────────────────

const ProjectItem = ({
  project,
  onEnter,
  onMove,
  onLeave,
  inView,
  delay,
}: {
  project: (typeof PROJECTS)[number];
  onEnter: (src: string, e: ReactMouseEvent) => void;
  onMove: (e: ReactMouseEvent) => void;
  onLeave: () => void;
  inView: boolean;
  delay: number;
}) => (
  <Reveal delay={delay} inView={inView}>
    <div className="group border-fg/[0.04] border-b border-dashed pb-8 last:border-b-0 last:pb-0">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-baseline gap-2.5">
          <a
            className="inline-flex items-center gap-2 font-generalsans font-medium text-[15px] text-fg/80 transition-colors duration-300 hover:text-fg"
            href={project.link}
            onMouseEnter={(e) => onEnter(project.image, e)}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
            rel="noopener noreferrer"
            target="_blank"
          >
            {project.name}
            <svg
              aria-hidden="true"
              className="h-2.5 w-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 12 12"
            >
              <path d="M2 10L10 2M10 2H5M10 2v5" />
            </svg>
          </a>
          <span className="font-mono text-[10px] text-fg/20">
            {project.year}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-fg/25 uppercase tracking-[0.15em]">
            {project.category}
          </span>
        </div>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="font-satoshi text-[12px] text-fg/35 italic">
          {project.role}
        </span>
        <span className="font-mono text-[10px] text-fg/15">—</span>
        <span className="font-mono text-[10px] text-fg/25 uppercase tracking-[0.15em]">
          {project.tagline}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {project.points.map((point) => (
          <p
            className="font-satoshi text-[13px] text-fg/45 leading-[1.65]"
            key={point}
          >
            <span className="mr-2 inline-block font-mono text-[9px] text-fg/20">
              ▸
            </span>
            {point}
          </p>
        ))}
      </div>

      {/* Tech tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            className="font-mono text-[9px] text-fg/25 uppercase tracking-[0.1em]"
            key={t}
          >
            {t}
            {t !== project.tech.at(-1) && (
              <span className="ml-1.5 text-fg/10">·</span>
            )}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <a
          className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg/70"
          href={project.link}
          onMouseEnter={(e) => onEnter(project.image, e)}
          onMouseLeave={onLeave}
          onMouseMove={onMove}
          rel="noopener noreferrer"
          target="_blank"
        >
          Live
        </a>
        <span className="h-px w-2 bg-fg/10" />
        <a
          className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg/70"
          href={project.repo}
          rel="noopener noreferrer"
          target="_blank"
        >
          Source
        </a>
      </div>
    </div>
  </Reveal>
);

// ─── Expression map for sections ──────────────────────────────────────────────
// Maps section visibility to ASCII buddy expressions:
// 0=chillin, 1=happy, 2=uwu, 3=surprised, 4=sleepy, 5=excited, 6=meh, 7=wink, 8=dead, 9=love, 10=rich, 11=confused

// ─── Resume Page ──────────────────────────────────────────────────────────────

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Section refs for buddy expression hints
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const certsRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const mainInView = useInView(mainRef, { once: true, margin: "-60px" });

  // Section visibility for buddy expressions (not once — tracks live scroll)
  const experienceVisible = useInView(experienceRef, { margin: "-40%" });
  const projectsVisible = useInView(projectsRef, { margin: "-40%" });
  const certsVisible = useInView(certsRef, { margin: "-40%" });
  const achievementsVisible = useInView(achievementsRef, { margin: "-40%" });
  const skillsVisible = useInView(skillsRef, { margin: "-40%" });
  const statusVisible = useInView(statusRef, { margin: "-40%" });

  // Derive expression from which section is most visible
  const buddyExpression = (() => {
    if (statusVisible) {
      return 9; // love — "get in touch"
    }
    if (achievementsVisible) {
      return 5; // excited — hackathon wins
    }
    if (certsVisible) {
      return 1; // happy — certifications
    }
    if (skillsVisible) {
      return 3; // surprised — all those skills
    }
    if (projectsVisible) {
      return 10; // rich — shipped projects
    }
    if (experienceVisible) {
      return 7; // wink — co-founder
    }
    return 0; // chillin — default
  })();

  const cursor = useCursorImage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="relative min-h-screen bg-surface pt-20 pb-0 font-generalsans"
        ref={containerRef}
      >
        {/* ─── Header ──────────────────────────────────────────────────────── */}
        <header
          className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:px-10 md:pt-16 md:pb-16"
          ref={headerRef}
        >
          {/* Top meta row */}
          <motion.div
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            }}
          >
            <div>
              <h1 className="font-generalsans font-light text-[clamp(42px,8vw,72px)] text-fg leading-[0.9] tracking-tighter">
                Aman <span className="font-medium">Aziz</span>
              </h1>
              <p className="mt-3 max-w-xl font-satoshi text-[15px] text-fg/45 leading-relaxed">
                Full-stack developer and UI/UX designer with expertise in React,
                Next.js, Node.js, and MongoDB. Building AI-integrated web
                applications that drive engagement and results.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
              {/* ASCII Buddy — desktop only, living header companion */}
              <div className="hidden md:block">
                <AsciiBuddy
                  expressionHint={buddyExpression}
                  inView={headerInView}
                />
              </div>
              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <a
                  className="font-mono text-[11px] text-fg/40 transition-colors duration-300 hover:text-fg"
                  href="mailto:amanaziz2020@gmail.com"
                >
                  amanaziz2020@gmail.com
                </a>
                <span className="font-mono text-[11px] text-fg/25">
                  +91 93159 78211
                </span>
                <span className="font-mono text-[11px] text-fg/25">
                  Bhopal, MP — India
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <a
                    className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg"
                    href="https://linkedin.com/in/aman-aziz"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                  <span className="h-px w-2 bg-fg/10" />
                  <a
                    className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg"
                    href="https://github.com/tutankhAman"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                  <span className="h-px w-2 bg-fg/10" />
                  <a
                    className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg"
                    href="/"
                  >
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            animate={headerInView ? { scaleX: 1 } : {}}
            className="h-px w-full origin-left bg-fg/[0.08]"
            initial={{ scaleX: 0 }}
            transition={{
              duration: 1.0,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.3,
            }}
          />
        </header>

        {/* ASCII Buddy — mobile only */}
        <div className="mx-auto mb-8 flex max-w-7xl justify-center px-6 md:hidden md:px-10">
          <AsciiBuddy expressionHint={buddyExpression} inView={headerInView} />
        </div>

        {/* ─── Main Grid ───────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-10" ref={mainRef}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12 lg:gap-x-14">
            {/* ──────────── LEFT COLUMN (8 cols) ──────────── */}
            <div className="flex flex-col gap-16 md:col-span-7 lg:col-span-8">
              {/* Experience */}
              <section ref={experienceRef}>
                <SectionLabel index={1} inView={mainInView}>
                  Experience
                </SectionLabel>
                <Reveal delay={0.2} inView={mainInView}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-generalsans font-medium text-[16px] text-fg/80">
                        {EXPERIENCE.company}
                      </h3>
                      <span className="font-satoshi text-[13px] text-fg/40 italic">
                        {EXPERIENCE.role}
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-0.5 sm:items-end">
                      <span className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.15em]">
                        {EXPERIENCE.period}
                      </span>
                      <span className="font-mono text-[10px] text-fg/20 uppercase tracking-[0.1em]">
                        {EXPERIENCE.location}
                      </span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.3} inView={mainInView}>
                  <div className="mt-4 flex flex-col gap-2">
                    {EXPERIENCE.points.map((point) => (
                      <p
                        className="font-satoshi text-[13px] text-fg/45 leading-[1.65]"
                        key={point}
                      >
                        <span className="mr-2 inline-block font-mono text-[9px] text-fg/20">
                          ▸
                        </span>
                        {point}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* Projects */}
              <section ref={projectsRef}>
                <SectionLabel index={2} inView={mainInView}>
                  Projects
                </SectionLabel>
                <div className="flex flex-col gap-8">
                  {PROJECTS.map((project, i) => (
                    <ProjectItem
                      delay={0.2 + i * 0.1}
                      inView={mainInView}
                      key={project.name}
                      onEnter={cursor.onEnter}
                      onLeave={cursor.onLeave}
                      onMove={cursor.onMove}
                      project={project}
                    />
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section ref={certsRef}>
                <SectionLabel index={3} inView={mainInView}>
                  Certifications
                </SectionLabel>
                <Reveal delay={0.2} inView={mainInView}>
                  <div className="flex flex-col gap-5">
                    {/* IBM */}
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <span className="font-generalsans font-medium text-[13px] text-fg/60">
                          IBM
                        </span>
                        <span className="h-px flex-1 bg-fg/[0.05]" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {CERTIFICATIONS.map((cert) => (
                          <span
                            className="font-mono text-[10px] text-fg/35 leading-relaxed"
                            key={cert}
                          >
                            {cert}
                            {cert !== CERTIFICATIONS.at(-1) && (
                              <span className="mx-1.5 text-fg/15">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* NPTEL */}
                    <div>
                      <div className="mb-2.5 flex items-center gap-2">
                        <span className="font-generalsans font-medium text-[13px] text-fg/60">
                          NPTEL
                        </span>
                        <span className="h-px flex-1 bg-fg/[0.05]" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {NPTEL_CERTS.map((cert) => (
                          <span
                            className="font-mono text-[10px] text-fg/35 leading-relaxed"
                            key={cert}
                          >
                            {cert}
                            {cert !== NPTEL_CERTS.at(-1) && (
                              <span className="mx-1.5 text-fg/15">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Achievements */}
              <section ref={achievementsRef}>
                <SectionLabel index={4} inView={mainInView}>
                  Achievements
                </SectionLabel>
                <Reveal delay={0.2} inView={mainInView}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {ACHIEVEMENTS.map((item) => (
                      <div className="flex items-start gap-2.5" key={item}>
                        <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-fg/15" />
                        <span className="font-satoshi text-[13px] text-fg/45 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>
            </div>

            {/* ──────────── RIGHT COLUMN (4 cols) ──────────── */}
            <aside className="flex flex-col gap-14 md:col-span-5 md:border-fg/[0.06] md:border-l md:border-dashed md:pl-10 lg:col-span-4 lg:pl-14">
              {/* Education */}
              <section>
                <SectionLabel index={5} inView={mainInView}>
                  Education
                </SectionLabel>
                <Reveal delay={0.25} inView={mainInView}>
                  <h3 className="font-generalsans font-medium text-[14px] text-fg/70">
                    {EDUCATION.institution}
                  </h3>
                  <p className="mt-1 font-satoshi text-[13px] text-fg/40 italic">
                    {EDUCATION.degree}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-fg/25 uppercase tracking-[0.15em]">
                      {EDUCATION.period}
                    </span>
                    <span className="h-px w-2 bg-fg/10" />
                    <span className="font-mono text-[10px] text-fg/20 uppercase tracking-[0.1em]">
                      {EDUCATION.location}
                    </span>
                  </div>
                </Reveal>
              </section>

              {/* Technical Skills */}
              <section ref={skillsRef}>
                <SectionLabel index={6} inView={mainInView}>
                  Technical Skills
                </SectionLabel>
                <div className="flex flex-col gap-6">
                  {/* Languages */}
                  <Reveal delay={0.2} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Languages
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.languages.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Frontend */}
                  <Reveal delay={0.25} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Frontend
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.frontend.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Backend */}
                  <Reveal delay={0.3} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Backend
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.backend.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Cloud & DB */}
                  <Reveal delay={0.35} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Cloud & Database
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.cloud.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Design */}
                  <Reveal delay={0.4} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Design
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.design.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Tools */}
                  <Reveal delay={0.45} inView={mainInView}>
                    <div>
                      <span className="mb-2.5 block font-mono text-[10px] text-fg/25 uppercase tracking-[0.2em]">
                        Tools & Platforms
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SKILLS.tools.map((s) => (
                          <SkillTag key={s}>{s}</SkillTag>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* Soft Skills */}
              <section>
                <SectionLabel index={7} inView={mainInView}>
                  Soft Skills
                </SectionLabel>
                <Reveal delay={0.25} inView={mainInView}>
                  <div className="flex flex-wrap gap-1.5">
                    {SOFT_SKILLS.map((s) => (
                      <SkillTag key={s}>{s}</SkillTag>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* Languages */}
              <section>
                <SectionLabel index={8} inView={mainInView}>
                  Languages
                </SectionLabel>
                <Reveal delay={0.25} inView={mainInView}>
                  <div className="flex flex-col gap-2.5">
                    {LANGUAGES_SPOKEN.map((lang) => (
                      <div className="flex items-center gap-3" key={lang}>
                        <span className="h-px w-3 bg-fg/10" />
                        <span className="font-satoshi text-[13px] text-fg/50">
                          {lang}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* Status */}
              <section ref={statusRef}>
                <Reveal delay={0.3} inView={mainInView}>
                  <div className="border border-fg/[0.06] border-dashed p-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg/20" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg/40" />
                      </span>
                      <span className="font-mono text-[10px] text-fg/30 uppercase tracking-[0.2em]">
                        Open to work
                      </span>
                    </div>
                    <p className="mt-3 font-satoshi text-[12px] text-fg/35 leading-relaxed">
                      Experienced in building AI-integrated web apps, optimizing
                      performance, and delivering client-focused solutions.
                      Skilled in intuitive interfaces, real-time AI features,
                      and leading small teams.
                    </p>
                    <a
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] text-fg/40 uppercase tracking-[0.15em] transition-colors duration-300 hover:text-fg"
                      href="mailto:amanaziz2020@gmail.com"
                    >
                      Get in touch
                      <svg
                        aria-hidden="true"
                        className="h-2.5 w-2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 12 12"
                      >
                        <path d="M2 6h8M7 3l3 3-3 3" />
                      </svg>
                    </a>
                  </div>
                </Reveal>
              </section>
            </aside>
          </div>
        </div>

        {/* ─── Cursor-attached image ───────────────────────────────────────── */}
        <AnimatePresence>
          {cursor.active && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="pointer-events-none fixed z-50"
              exit={{ opacity: 0, scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.92 }}
              key="cursor-image"
              style={{
                left: cursor.active.x + 16,
                top: cursor.active.y + 16,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <div className="overflow-hidden border border-fg/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                <img
                  alt=""
                  className="block h-auto w-[240px] object-cover"
                  height={160}
                  src={cursor.active.src}
                  width={240}
                />
              </div>
              <span className="mt-1.5 block font-mono text-[9px] text-fg/25 uppercase tracking-[0.2em]">
                Preview
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

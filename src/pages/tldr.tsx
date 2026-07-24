import { ArrowUpRight, ChevronDown, Mail, Plus, Volume2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactSection } from "@/components/resume/contact-section";
import { GitHubActivity } from "@/components/resume/github-activity";
import { OutroSection } from "@/components/resume/outro-section";
import {
  type SectionItem,
  StickySideNav,
} from "@/components/resume/sticky-side-nav";
import { TechStack } from "@/components/resume/tech-stack";
import { StylizedName } from "@/components/shared/stylized-name";
import { ARCHIVED_PROJECTS, type ArchivedProject } from "@/data/projects";

function ArchivedProjectCard({ project }: { project: ArchivedProject }) {
  return (
    <div className="resume-card border border-neutral-300 border-dashed bg-neutral-50/50 p-6 md:p-8">
      {project.link ? (
        <a
          className="group inline-flex items-center gap-1.5 font-medium font-serif text-2xl text-neutral-800 tracking-tight transition-colors hover:text-neutral-900"
          href={project.link}
          rel="noreferrer"
          target="_blank"
        >
          <span className="underline-offset-4 group-hover:underline">
            {project.title}
          </span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-400 group-hover:text-neutral-800" />
        </a>
      ) : (
        <h3 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight">
          {project.title}
        </h3>
      )}
      <p className="mt-1 font-poppins text-neutral-500 text-xs">
        {project.stack}
      </p>
      <p className="mt-3 font-poppins text-md text-neutral-600 leading-relaxed sm:text-md md:text-md4">
        {project.description}
      </p>
    </div>
  );
}

const INITIAL_SECTIONS: SectionItem[] = [
  { id: "section-1", label: "Overview", index: 1 },
  { id: "section-2", label: "Singularity Works", index: 2 },
  { id: "section-3", label: "Larity", index: 3 },
  { id: "section-4", label: "Saltwise", index: 4 },
  { id: "section-5", label: "Archived Projects", index: 5 },
  { id: "section-6", label: "Records", index: 6 },
  { id: "section-7", label: "Stack", index: 7 },
  { id: "section-8", label: "Contact", index: 8 },
  { id: "section-9", label: "Blogs", index: 9 },
  { id: "section-10", label: "Outro", index: 10 },
];

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect height="12" width="4" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    name: "X (Twitter)",
    href: "https://x.com/amancooks",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/aman-aziz",
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/tutankhAman",
    icon: GithubIcon,
  },
  {
    name: "Email",
    href: "mailto:amanaziz2020@gmail.com",
    icon: Mail,
  },
];

function getActiveSectionId(sections: SectionItem[]): string {
  const isAtBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 60;

  if (isAtBottom) {
    return sections.at(-1)?.id ?? "section-10";
  }

  const targetPoint = window.innerHeight * 0.3;
  let bestSectionId = sections[0].id;
  let minDistance = Number.POSITIVE_INFINITY;

  for (const sec of sections) {
    const el = document.getElementById(sec.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(rect.top - targetPoint);
      if (rect.top <= targetPoint + 120 && distance < minDistance) {
        minDistance = distance;
        bestSectionId = sec.id;
      }
    }
  }

  return bestSectionId;
}

export default function ResumePage({
  isLoaderComplete = true,
}: {
  isLoaderComplete?: boolean;
}) {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isArchivedOpen, setIsArchivedOpen] = useState(false);

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    isClickScrollingRef.current = true;

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 800);
  }, []);

  const playPronunciation = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Aman Aziz");
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find((v) => v.lang.startsWith("en"));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    let ticking = false;

    const handleScroll = () => {
      if (isClickScrollingRef.current) {
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
          setActiveSection(getActiveSectionId(INITIAL_SECTIONS));
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="resume-page relative min-h-screen bg-white font-generalsans">
      {/* Sticky Desktop Side Section Navigation */}
      <StickySideNav
        activeSectionId={activeSection}
        isLoaderComplete={isLoaderComplete}
        onSelectSection={scrollToSection}
        sections={INITIAL_SECTIONS}
      />

      {/* Main Area */}
      <main className="relative w-full pb-20">
        {/* ScrollVelocity behind with lower z-index */}
        {/* <div className="absolute top-28 left-0 z-0 w-full overflow-hidden">
          <ScrollVelocity
            className="font-generalsans font-medium text-[20rem] text-neutral-500 uppercase leading-[0.82] tracking-tighter"
            damping={50}
            numCopies={6}
            parallaxClassName="w-full border-y border-fg/10 py-6 sm:py-8 md:py-12 lg:py-16"
            stiffness={400}
            texts={["AMAN"]}
            velocity={100}
          />
        </div> */}

        {/* Page Content Container - Set bg-white so it covers the background ScrollVelocity */}
        <div className="resume-content relative z-10 mx-auto w-[90%] max-w-4xl border-fg/60 border-x border-dashed bg-white pt-20">
          {/* Section 1 */}
          <section className="p-6 pt-12 md:p-10 md:pt-16" id="section-1">
            {/* Header row split into Left (Name + Dictionary Phonetic) and Right (Social Icons) */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-light text-4xl text-neutral-900 tracking-tighter sm:text-6xl md:text-6xl">
                  <StylizedName />
                </h1>

                {/* Dictionary Phonetic Translation */}
                <div className="mt-3 flex items-center gap-2.5 font-mono text-neutral-500 text-sm">
                  <span className="font-serif text-neutral-400 text-xs italic">
                    noun
                  </span>
                  <span className="text-neutral-300">/</span>
                  <span className="font-mono text-neutral-600 text-xs tracking-wider">
                    /ɑːˈmɑːn əˈziːz/
                  </span>
                  <button
                    aria-label="Listen to pronunciation"
                    className={`inline-flex h-6 w-6 items-center justify-center border transition-all duration-200 ${
                      isPlaying
                        ? "animate-pulse border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                    }`}
                    onClick={playPronunciation}
                    type="button"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 sm:pt-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center border border-neutral-200 text-neutral-600 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                      href={social.href}
                      key={social.name}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 w-full font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              Final-year CS student, Co-founder and Frontend Lead at Singularity
              Works. Twice a national hackathon winner, MLH HackByte 4.0 and
              Summer of Codefest 2025. <br /> Currently building Larity, a
              desktop app for meeting intelligence, on my own time. I like
              building things more than talking about building things.
            </p>
          </section>

          {/* Section 2 */}
          <section
            className="border-fg/40 border-t border-dashed p-6 md:p-10"
            id="section-2"
          >
            <h2 className="font-serif text-2xl text-neutral-800 leading-snug tracking-tight sm:text-3xl">
              {/* <span className="text-5xl text-neutral-500">
                <em>I&apos;m</em>
              </span>
              <br /> */}
              Co-founder and Frontend Lead at Singularity Works
            </h2>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Aug 2025 to Present
            </p>
            <ul className="mt-6 w-full space-y-3 font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Co-founded a design and development studio, leading end-to-end
                  delivery for global clients across UI/UX design, frontend, and
                  full-stack development
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Delivered 5 client projects with a 4.8+ rating, generating
                  six-figure revenue within the first two months
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Translated ambiguous requirements into precise UX flows and
                  production-ready systems, including for clients with zero
                  technical background
                </span>
              </li>
            </ul>

            <a
              className="mt-6 inline-flex items-center gap-1.5 font-poppins text-neutral-500 text-sm transition-colors hover:text-neutral-900"
              href="https://itssingularity.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="font-mono uppercase underline underline-offset-4">
                View Website
              </span>
              <span aria-hidden="true" className="text-lg leading-none">
                →
              </span>
            </a>

            {/* <video
              autoPlay
              className="mt-8 w-full"
              loop
              muted
              playsInline
              poster="http://cdn.itssingularity.com/image/huA"
            >
              <source src="/singularity-hero.mp4" type="video/mp4" />
            </video> */}
          </section>

          {/* Section 3 */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-3"
          >
            <a
              className="group inline-flex items-center gap-2 font-medium font-serif text-3xl text-neutral-800 tracking-tight transition-colors hover:text-neutral-900"
              href="https://larity.itssingularity.com"
              rel="noreferrer"
              target="_blank"
            >
              <span className="underline-offset-4 group-hover:underline">
                Larity
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-400 group-hover:text-neutral-800" />
            </a>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Organizational memory and intelligence platform | Tauri,
              TypeScript, Elysia, pgvector, Redis, Groq, Gemini
            </p>
            <p className="mt-6 w-full font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              Desktop-native meeting intelligence platform. Captures
              conversations, detects contradictions in real time through a
              four-tier LLM pipeline, and builds long-horizon organizational
              memory, all without storing raw audio. $1.22 per meeting, sub-2s
              latency.
            </p>
            <img
              alt="Larity"
              className="mt-10 w-full border border-neutral-300 border-dashed"
              height={600}
              src="/Larity.png"
              width={1200}
            />
          </section>

          {/* Section 4 */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-4"
          >
            <a
              className="group inline-flex items-center gap-2 font-medium font-serif text-3xl text-neutral-800 tracking-tight transition-colors hover:text-neutral-900"
              href="https://saltwise.vercel.app"
              rel="noreferrer"
              target="_blank"
            >
              <span className="underline-offset-4 group-hover:underline">
                Saltwise
              </span>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-400 group-hover:text-neutral-800" />
            </a>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Prescription intelligence system | Next.js, TypeScript, Supabase,
              Groq, Firecrawl
            </p>
            <p className="mt-6 w-full font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              Prescription intelligence system that maps branded drugs to
              generic equivalents at the salt level, cutting patient costs 40 to
              60 percent. Aggregates live pharmacy pricing, reads prescriptions
              via OCR, and layers deterministic safety logic on top of
              LLM-driven interaction checks.
            </p>
            <img
              alt="Saltwise"
              className="mt-10 w-full border border-neutral-300 border-dashed"
              height={600}
              src="/saltwise.webp"
              width={1200}
            />
          </section>

          {/* Section 5: Archived Projects (Collapsible) */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-5"
          >
            <button
              aria-expanded={isArchivedOpen}
              className="group flex w-full items-center justify-between text-left focus:outline-none"
              onClick={() => setIsArchivedOpen((prev) => !prev)}
              type="button"
            >
              <div className="flex items-center gap-3">
                <h2 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight transition-colors group-hover:text-neutral-900 sm:text-3xl">
                  Archived Projects
                </h2>
                <span className="border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-neutral-500 text-xs">
                  {ARCHIVED_PROJECTS.length}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center border border-neutral-200 text-neutral-500 transition-all duration-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isArchivedOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isArchivedOpen && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mt-8 space-y-6">
                    {ARCHIVED_PROJECTS.map((project) => (
                      <ArchivedProjectCard
                        key={project.title}
                        project={project}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Section 6: Records */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-6"
          >
            <h2 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight sm:text-3xl">
              Records
            </h2>

            <div className="mt-8 space-y-6">
              {/* Card 1: MLH HackByte 4.0 */}
              <div className="resume-card group border border-neutral-300 border-dashed bg-neutral-50/50 p-6 transition-colors hover:border-neutral-400 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-neutral-500 text-xs">
                        Hackathon Winner
                      </span>
                      <span className="font-mono text-neutral-400 text-xs">
                        2026
                      </span>
                    </div>
                    <h3 className="mt-3 font-medium font-serif text-2xl text-neutral-800 tracking-tight md:text-3xl">
                      1st Place — MLH HackByte 4.0
                    </h3>
                    <p className="mt-3 font-poppins text-neutral-600 text-sm leading-relaxed md:text-md4">
                      Major League Hacking global hackathon. Built and shipped
                      Chorus, an agent orchestration platform, in one weekend.
                    </p>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden border border-neutral-300 border-dashed md:w-72 lg:w-80">
                    <img
                      alt="Chorus - MLH HackByte 4.0"
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      height={350}
                      src="/hackbyte.jpg"
                      width={600}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Summer of Codefest 2025 */}
              <div className="resume-card group border border-neutral-300 border-dashed bg-neutral-50/50 p-6 transition-colors hover:border-neutral-400 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-neutral-500 text-xs">
                        Hackathon Winner
                      </span>
                      <span className="font-mono text-neutral-400 text-xs">
                        2025
                      </span>
                    </div>
                    <h3 className="mt-3 font-medium font-serif text-2xl text-neutral-800 tracking-tight md:text-3xl">
                      1st Place — Summer of Codefest 2025
                    </h3>
                    <p className="mt-3 font-poppins text-neutral-600 text-sm leading-relaxed md:text-md4">
                      Built VerQ, an AI-powered interview prep platform, from
                      idea to working product.
                    </p>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden border border-neutral-300 border-dashed md:w-72 lg:w-80">
                    <img
                      alt="VerQ - Summer of Codefest 2025"
                      className="h-44 w-full object-cover object-[center_75%] transition-transform duration-500 group-hover:scale-105"
                      height={350}
                      src="/codefest-1.jpg"
                      width={600}
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: AsyncAPI Conference Singapore */}
              <div className="resume-card group border border-neutral-300 border-dashed bg-neutral-50/50 p-6 transition-colors hover:border-neutral-400 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-neutral-500 text-xs">
                        OSS Contribution
                      </span>
                      <span className="font-mono text-neutral-400 text-xs">
                        2025
                      </span>
                    </div>
                    <h3 className="mt-3 font-medium font-serif text-2xl text-neutral-800 tracking-tight md:text-3xl">
                      UI Design Featured — AsyncAPI Conference Singapore
                    </h3>
                    <p className="mt-3 font-poppins text-neutral-600 text-sm leading-relaxed md:text-md4">
                      Design contribution selected and used for AsyncAPI's
                      official Singapore conference materials.
                    </p>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden border border-neutral-300 border-dashed md:w-72 lg:w-80">
                    <img
                      alt="UI Design Featured - AsyncAPI Conference Singapore"
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      height={350}
                      src="/asyncapi.png"
                      width={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Stack */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-7"
          >
            <h2 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight sm:text-3xl">
              Stack
            </h2>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Languages, frameworks, databases, and cloud infrastructure tools
            </p>

            <div className="mt-8">
              <TechStack />
            </div>

            {/* GitHub Activity Matrix */}
            <div className="mt-12">
              <GitHubActivity inView={true} />
            </div>
          </section>

          {/* Section 8: Contact */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-8"
          >
            <h2 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight sm:text-3xl">
              Contact & Socials
            </h2>
            <div className="mt-8">
              <ContactSection />
            </div>
          </section>

          {/* Section 9: Blogs */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-9"
          >
            <h2 className="font-medium font-serif text-3xl text-neutral-800 tracking-tight">
              Blogs
            </h2>

            <div className="mt-8 space-y-6">
              <a
                className="group block border border-neutral-300 border-dashed bg-neutral-50/50 p-5 transition-colors hover:border-neutral-400 md:p-6"
                href="https://itssingularity.com/chronicles/designing-singularity-works"
                rel="noreferrer"
                target="_blank"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="border border-neutral-200 bg-neutral-100 px-2 py-0.5 font-mono text-neutral-500 text-xs">
                        Design
                      </span>
                      <span className="font-mono text-neutral-400 text-xs">
                        9 min read
                      </span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <h3 className="font-medium font-serif text-2xl text-neutral-800 tracking-tight transition-colors group-hover:text-neutral-900 md:text-3xl">
                        The Hardest Client We Ever Had Was Us — Designing
                        Singularity Works
                      </h3>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-800 md:mt-1.5" />
                    </div>
                  </div>
                  <div className="w-full shrink-0 overflow-hidden border border-neutral-300 border-dashed md:w-64 lg:w-72">
                    <img
                      alt="Designing the Singularity Works Website"
                      className="aspect-[2/1] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      height={300}
                      src="/singularity-design.webp"
                      width={600}
                    />
                  </div>
                </div>
              </a>
            </div>
          </section>

          {/* Section 10: Outro */}
          <section
            className="border-fg/60 border-y border-dashed p-6 md:p-10"
            id="section-10"
          >
            <OutroSection />
          </section>
        </div>
      </main>
    </div>
  );
}

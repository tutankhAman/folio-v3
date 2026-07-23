import { Mail, Plus, Volume2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  type SectionItem,
  StickySideNav,
} from "@/components/resume/sticky-side-nav";
import { StylizedName } from "@/components/shared/stylized-name";

const INITIAL_SECTIONS: SectionItem[] = [
  { id: "section-1", label: "Overview", index: 1 },
  { id: "section-2", label: "Section 2", index: 2 },
  { id: "section-3", label: "Section 3", index: 3 },
  { id: "section-4", label: "Section 4", index: 4 },
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

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-generalsans">
      {/* Sticky Desktop Side Section Navigation */}
      <StickySideNav
        activeSectionId={activeSection}
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
        <div className="relative z-10 mx-auto w-[90%] max-w-4xl border-fg/60 border-x border-dashed bg-white pt-20">
          {/* Section 1 */}
          <section className="p-6 pt-12 md:p-10 md:pt-16" id="section-1">
            {/* Header row split into Left (Name + Dictionary Phonetic) and Right (Social Icons) */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-light text-5xl text-neutral-900 tracking-tighter sm:text-6xl md:text-6xl">
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
            <h2 className="font-serif text-3xl text-neutral-800 leading-snug tracking-tight">
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
            <h2 className="font-medium font-serif text-3xl text-neutral-800 tracking-tight">
              Larity
            </h2>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Organizational memory and intelligence platform | Tauri,
              TypeScript, Elysia, pgvector, Redis, Groq, Gemini
            </p>
            <p className="mt-6 w-full font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              Most meeting tools transcribe. Larity tracks contradictions as
              they happen and turns scattered meeting notes into a searchable,
              structured memory, without recording or storing raw audio.
            </p>
            <img
              alt="Larity"
              className="mt-10 w-full border border-neutral-300 border-dashed"
              height={600}
              src="/Larity.png"
              width={1200}
            />

            <ul className="mt-6 w-full space-y-3 font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Native desktop app for real-time meeting intelligence:
                  dual-channel audio capture, speaker diarization via voice
                  activity detection with zero enrollment and zero stored audio
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Live contradiction detection through a four-tier LLM pipeline:
                  pre-filter, Groq classification, pgvector semantic search,
                  Gemini reasoning
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Post-meeting intelligence layer with decision and task
                  extraction, versioned audit trails, and a knowledge graph
                  built on long-horizon vector memory
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  GitHub repo ingestion, calendar and email integration,
                  automated document generation for contracts, proposals, and
                  SOWs
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Multi-user sessions, voice-first grounded Q&A assistant,
                  workload management with timeline prediction
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>All-in cost of $1.22 per meeting</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section
            className="border-fg/60 border-t border-dashed p-6 md:p-10"
            id="section-4"
          >
            <h2 className="font-medium font-serif text-3xl text-neutral-800 tracking-tight">
              Saltwise
            </h2>
            <p className="mt-1.5 font-poppins text-neutral-500 text-sm">
              Prescription intelligence system | Next.js, TypeScript, Supabase,
              Groq, Firecrawl
            </p>
            <p className="mt-6 w-full font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              Branded drugs in India often cost 3-5x their generic equivalent,
              but most patients don&apos;t know a generic exists or which one is
              actually safe to substitute. Saltwise closes that gap: it matches
              drugs at the salt level, not the brand name, so switching is safe
              and the savings are real.
            </p>
            <img
              alt="Saltwise"
              className="mt-10 w-full border border-neutral-300 border-dashed"
              height={600}
              src="/saltwise.webp"
              width={1200}
            />

            <ul className="mt-6 w-full space-y-3 font-poppins text-md text-neutral-600 leading-relaxed tracking-normal sm:text-md md:text-md4">
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Maps branded drugs to safe generic alternatives at the salt
                  level, reducing patient costs by 40 to 60 percent
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Real-time pharmacy price aggregation by scraping 1mg and
                  PharmEasy via Firecrawl, with confidence-level tracking and
                  caching
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  LLM integration via Vercel AI SDK for prescription OCR,
                  natural language search, and patient-friendly explanations
                </span>
              </li>
              <li className="flex gap-3">
                <Plus className="mt-1.5 h-3 w-3 shrink-0 text-neutral-400" />
                <span>
                  Deterministic drug interaction safety logic layered on top of
                  LLM outputs, so safety checks don&apos;t rely on model
                  judgment alone
                </span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

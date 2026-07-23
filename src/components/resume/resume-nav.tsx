import { useCallback, useEffect, useState } from "react";

export interface SectionItem {
  id: string;
  label: string;
  index: number;
}

interface ResumeNavProps {
  sections: SectionItem[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  emailToCopy: string;
}

export function ResumeNav({
  sections,
  activeSectionId,
  onSelectSection,
  emailToCopy,
}: ResumeNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = window.scrollY / totalScroll;
        setScrollProgress(Math.min(Math.max(currentProgress, 0), 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [emailToCopy]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      {/* ─── Top Scroll Progress Line (Pure visual feedback, hidden from screen readers) ─── */}
      <div
        aria-hidden="true"
        className="no-print fixed top-0 right-0 left-0 z-50 h-[3px] bg-fg/10"
      >
        <div
          className="h-full bg-gradient-to-r from-fg/60 via-fg to-emerald-400 transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "0% 50%",
          }}
        />
      </div>

      {/* ─── Top Floating Quick Toolbar (no-print) ─── */}
      <div className="no-print fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full border border-fg/10 bg-surface-elevated/90 px-3 py-2 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:border-fg/20">
        {/* Copy Email */}
        <button
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-fg/70 uppercase tracking-wider transition-colors hover:bg-fg/[0.06] hover:text-fg"
          onClick={handleCopyEmail}
          type="button"
        >
          {copied ? (
            <span className="font-semibold text-emerald-500">✓ Copied!</span>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 12 12"
              >
                <path d="M2 3.5h8v5H2zM2 3.5l4 3 4-3" />
              </svg>
              <span>Copy Email</span>
            </>
          )}
        </button>

        <span className="h-3 w-px bg-fg/10" />

        {/* Print / Download PDF */}
        <button
          className="flex items-center gap-1.5 rounded-full bg-fg px-3 py-1.5 font-medium font-mono text-[11px] text-surface uppercase tracking-wider transition-all hover:bg-fg/90 active:scale-95"
          onClick={handlePrint}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 12 12"
          >
            <path d="M3 4V1.5h6V4M3 8.5H1.5v-3h9v3H9M3 7h6v3.5H3z" />
          </svg>
          <span>Print / PDF</span>
        </button>
      </div>

      {/* ─── Sticky Left Side Navigation (Desktop only, no-print) ─── */}
      <nav
        aria-label="Resume sections"
        className="no-print fixed top-1/2 left-8 z-30 hidden w-44 -translate-y-1/2 lg:block"
      >
        <div className="flex flex-col gap-3 border-fg/[0.08] border-l py-2 pl-3">
          {sections.map((sec) => {
            const isActive = activeSectionId === sec.id;
            return (
              <button
                className={`group flex items-center gap-2 text-left transition-all duration-200 ${
                  isActive ? "text-fg" : "text-fg/30 hover:text-fg/70"
                }`}
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                type="button"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive ? "w-4 bg-fg" : "w-2 bg-fg/20 group-hover:w-3"
                  }`}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                  0{sec.index}
                </span>
                <span
                  className={`font-generalsans text-[11px] tracking-tight ${
                    isActive ? "font-semibold text-fg" : "font-normal"
                  }`}
                >
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

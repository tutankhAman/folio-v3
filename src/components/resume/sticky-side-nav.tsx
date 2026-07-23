export interface SectionItem {
  id: string;
  label: string;
  index: number;
}

interface StickySideNavProps {
  sections: SectionItem[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export function StickySideNav({
  sections,
  activeSectionId,
  onSelectSection,
}: StickySideNavProps) {
  return (
    <nav
      aria-label="tl;dr sections"
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
  );
}

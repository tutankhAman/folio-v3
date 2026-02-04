import { useId, useMemo } from "react";

interface StatusCarouselProps {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
}

export const StatusCarousel = ({
  items,
  speed = 20,
  separator = "◌",
  className = "",
}: StatusCarouselProps) => {
  const baseId = useId();

  const carouselTrack = useMemo(() => {
    if (items.length === 0) {
      return null;
    }

    const trackItems = items.map((item, index) => ({
      id: `${baseId}-${item}-${index}`,
      text: item,
      separator,
    }));

    return [...trackItems, ...trackItems];
  }, [items, separator, baseId]);

  const trackStyle = {
    animationDuration: `${speed}s`,
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Status feed"
      className={`relative w-full overflow-hidden border-[#FFF0C7]/80 border-y-2 backdrop-blur-sm ${className}`}
    >
      <div
        className={`flex ${prefersReducedMotion ? "" : "animate-marquee"}`}
        style={prefersReducedMotion ? {} : trackStyle}
      >
        {carouselTrack?.map((trackItem) => (
          <div
            className="flex shrink-0 items-center"
            key={trackItem.id}
            style={prefersReducedMotion ? { transform: "translateX(0)" } : {}}
          >
            <span className="whitespace-nowrap px-4 py-3 font-heading font-semibold text-[#FFF0C7] text-sm uppercase tracking-[0.2em] sm:px-6 sm:py-4 sm:text-base md:px-8 md:text-lg lg:text-3xl">
              {trackItem.text}
            </span>
            <span
              aria-hidden="true"
              className="pr-4 text-[#FFF0C7]/60 text-sm sm:pr-6 sm:text-base md:pr-8 md:text-lg lg:text-xl"
            >
              {trackItem.separator}
            </span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
    </section>
  );
};

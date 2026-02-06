import Lenis from "lenis";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { flow } from "@/data/hero";

export const SmoothScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScrollToProjects = () => {
      // Target stage for "Intelligent Assistants" is 14
      // We add 0.5 to land in the middle of the stage to avoid boundary issues
      const targetStage = 15;
      const totalStages = flow.length;

      // Calculate progress (0 to 1) corresponding to the target stage
      const progress = targetStage / totalStages;

      // HeroSection height is 2000vh.
      // The scrollable distance that maps to 0-1 progress in useScroll depends on the offset.
      // useScroll offset ["start start", "end end"] means 0 at top, 1 at bottom.
      // Total scrollable height = Element Height - Viewport Height.
      const heroHeightVh = 2000;
      const scrollableHeightVh = heroHeightVh - 100;

      // Target scroll position in vh
      const targetScrollVh = progress * scrollableHeightVh;

      // Convert vh to pixels
      const targetScrollPx = (targetScrollVh * window.innerHeight) / 100;

      lenis.scrollTo(targetScrollPx, { duration: 2 });
    };

    window.addEventListener("scrollToProjects", handleScrollToProjects);

    // Check for query param
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("scrollToProjects") === "true") {
      // Small delay to ensure rendering and layout stability
      setTimeout(handleScrollToProjects, 100);
      // Clean up URL
      window.history.replaceState({}, "", "/");
    }

    return () => {
      lenis.destroy();
      window.removeEventListener("scrollToProjects", handleScrollToProjects);
    };
  }, [location]);

  return null;
};

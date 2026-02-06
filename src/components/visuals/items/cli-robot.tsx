import { useEffect, useRef, useState } from "react";

const BLINK_INTERVAL = 3200;
const BLINK_DURATION = 150;

/**
 * ASCII robot face with eyes that follow the mouse cursor.
 * Built with monospace CLI characters inspired by the Cline CLI aesthetic.
 */
export const CliRobot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Track mouse position globally (parent layer has pointer-events-none)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.32; // eye-line

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxShift = 4; // px – keep it subtle
      const factor = Math.min(maxShift / (dist || 1), 1);

      setPupil({ x: dx * factor, y: dy * factor });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Periodic blink
  useEffect(() => {
    const id = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), BLINK_DURATION);
    }, BLINK_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const eyeChar = isBlinking ? "─" : "●";

  const pupilStyle: React.CSSProperties = {
    display: "inline-block",
    transform: `translate(${String(pupil.x)}px, ${String(pupil.y)}px)`,
    transition: "transform 0.08s linear",
  };

  return (
    <div
      className="flex h-full w-full select-none items-center justify-center"
      ref={containerRef}
    >
      <pre
        className="text-center font-mono text-black leading-snug tracking-tight"
        style={{ fontSize: "clamp(8px, 1.1vw, 14px)" }}
      >
        {/* Antenna */}
        {"        ╭─╮        \n"}
        {"        │◈│        \n"}
        {"      ╭─┴─┴─╮      \n"}

        {/* Head top */}
        {"  ┌───┤ ◠◠◠ ├───┐  \n"}
        {"  │   ╰─────╯   │  \n"}

        {/* Eyes row – pupils follow cursor */}
        {"  │  "}
        <span className="relative inline-block w-[1ch] text-center">
          <span className="invisible">○</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span style={pupilStyle}>{eyeChar}</span>
          </span>
        </span>
        {"       "}
        <span className="relative inline-block w-[1ch] text-center">
          <span className="invisible">○</span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span style={pupilStyle}>{eyeChar}</span>
          </span>
        </span>
        {"  │  \n"}

        {/* Mouth */}
        {"  │   ╰─────╯   │  \n"}
        {"  │    ╭───╮    │  \n"}
        {"  │    │▓▓▓│    │  \n"}
        {"  │    ╰───╯    │  \n"}
        {"  └──────┬──────┘  \n"}

        {/* Neck */}
        {"       ╔═╧═╗       \n"}
        {"       ║   ║       \n"}

        {/* Body */}
        {"   ┌───╨───╨───┐   \n"}
        {"   │ ┌───────┐ │   \n"}
        {"   │ │ "}
        <span className="animate-pulse opacity-70">{">"}</span>
        {" _     │ │   \n"}
        {"   │ └───────┘ │   \n"}
        {"   │  ◈  ◈  ◈  │   \n"}
        {"   └──┬─────┬──┘   \n"}

        {/* Legs */}
        {"      │     │      \n"}
        {"   ╔══╧═╗╔══╧═╗   \n"}
        {"   ╚════╝╚════╝   \n"}
      </pre>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";

const BOOT_SEQUENCE = [
  "INITIALIZING...",
  "CHECKING MEMORY INTEGRITY...",
  "LOADING KERNEL...",
  "MOUNTING FILE SYSTEMS...",
  "ESTABLISHING SECURE CONNECTION...",
  "AUTHENTICATING USER...",
  "ACCESS GRANTED.",
  "SYSTEM ONLINE.",
];

const STATUS_LOGS = [
  "ENGINE SEQUENCE INITIATED",
  "PRIMARY THRUST ONLINE",
  "REACTOR CORE STABLE",
  "NAVIGATION LOCKED",
  "STARDRIVE CHARGING",
  "HYPERLANE ACQUIRED",
  "FUEL MIX NOMINAL",
  "LIFE SUPPORT GREEN",
  "SHIELD HARMONICS TUNED",
  "COMMUNICATIONS ACTIVE",
  "SENSORS CALIBRATED",
];

interface LogLine {
  id: string;
  text: string;
}

export const RetroTerminal = () => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;

    const addLine = () => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setLines((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            text: BOOT_SEQUENCE[currentIndex],
          },
        ]);
        currentIndex++;
        timeout = setTimeout(addLine, Math.random() * 300 + 100);
      } else {
        // Start random status logs
        const logInterval = setInterval(() => {
          const randomLog =
            STATUS_LOGS[Math.floor(Math.random() * STATUS_LOGS.length)];
          const timestamp = new Date()
            .toISOString()
            .split("T")[1]
            .split(".")[0];
          setLines((prev) => {
            const newLines = [
              ...prev,
              {
                id: Math.random().toString(36).substring(7),
                text: `[${timestamp}] ${randomLog}`,
              },
            ];
            if (newLines.length > 20) {
              return newLines.slice(newLines.length - 20);
            }
            return newLines;
          });
        }, 2000);
        return () => clearInterval(logInterval);
      }
    };

    timeout = setTimeout(addLine, 100);

    return () => clearTimeout(timeout);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on lines change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-sm border border-[#FFD700]/30 bg-black/50 p-4 font-mono text-[#FFD700] text-xs shadow-[0_0_20px_rgba(255,215,0,0.1)] md:text-sm"
      ref={scrollContainerRef}
      style={{
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[length:100%_4px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-repeat opacity-80" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

      <div className="relative z-0 flex flex-col gap-1 p-2">
        {lines.map((line) => (
          <div
            className="fade-in slide-in-from-left-2 animate-in duration-300"
            key={line.id}
          >
            <span className="mr-2 text-[#FF4500]">{">"}</span>
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
};

import {
  type MotionValue,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ─── ASCII Buddy ─────────────────────────────────────────────────────────────
// A living ASCII face that tracks the cursor, blinks, and shifts expressions.
// Built entirely from monospace characters at whisper-opacity.

interface Expression {
  eyeL: string;
  eyeR: string;
  mouth: string[];
  label: string;
}

const EXPRESSIONS: Expression[] = [
  {
    eyeL: "o",
    eyeR: "o",
    mouth: [" ", "~", " "],
    label: "chillin",
  },
  {
    eyeL: "^",
    eyeR: "^",
    mouth: [" ", "u", " "],
    label: "happy",
  },
  {
    eyeL: ">",
    eyeR: "<",
    mouth: [" ", "w", " "],
    label: "uwu",
  },
  {
    eyeL: "0",
    eyeR: "0",
    mouth: [" ", "o", " "],
    label: "surprised",
  },
  {
    eyeL: "-",
    eyeR: "-",
    mouth: [" ", ".", " "],
    label: "sleepy",
  },
  {
    eyeL: "*",
    eyeR: "*",
    mouth: ["\\", "_", "/"],
    label: "excited",
  },
  {
    eyeL: "~",
    eyeR: "~",
    mouth: [" ", "-", " "],
    label: "meh",
  },
];

const BLINK_EYE = "-";
const BLINK_DURATION = 120;

// Deterministic eye-pupil positions based on angle quadrant
// Returns which character represents the "look direction" for each eye
const getEyeChars = (
  expression: Expression,
  isBlinking: boolean
): { left: string; right: string } => {
  if (isBlinking) {
    return { left: BLINK_EYE, right: BLINK_EYE };
  }
  return { left: expression.eyeL, right: expression.eyeR };
};

// Maps normalized mouse position to a 3x3 pupil grid offset
const usePupilOffset = (
  containerRef: RefObject<HTMLElement | null>,
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>
) => {
  const centerX = useRef(0);
  const centerY = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    centerX.current = rect.left + rect.width / 2;
    centerY.current = rect.top + rect.height / 2;
  });

  const dx = useTransform(mouseX, (x) => {
    const diff = x - centerX.current;
    if (Math.abs(diff) < 40) {
      return 0;
    }
    return diff > 0 ? 1 : -1;
  });

  const dy = useTransform(mouseY, (y) => {
    const diff = y - centerY.current;
    if (Math.abs(diff) < 40) {
      return 0;
    }
    return diff > 0 ? 1 : -1;
  });

  return { dx, dy };
};

// The grid of characters representing the face, 9 rows x 11 cols
// Positions are (row, col), eyes at (2,3) and (2,7), mouth at (5,4..6)
const FACE_WIDTH = 11;
const FACE_HEIGHT = 9;

const buildFaceGrid = (
  expression: Expression,
  eyeChars: { left: string; right: string },
  pupilDx: number,
  pupilDy: number
): string[][] => {
  // Start with empty grid
  const grid: string[][] = Array.from({ length: FACE_HEIGHT }, () =>
    Array.from({ length: FACE_WIDTH }, () => " ")
  );

  // ── Border outline ──
  // Top
  grid[0][0] = ".";
  for (let c = 1; c < FACE_WIDTH - 1; c++) {
    grid[0][c] = "-";
  }
  grid[0][FACE_WIDTH - 1] = ".";

  // Bottom
  grid[FACE_HEIGHT - 1][0] = "'";
  for (let c = 1; c < FACE_WIDTH - 1; c++) {
    grid[FACE_HEIGHT - 1][c] = "-";
  }
  grid[FACE_HEIGHT - 1][FACE_WIDTH - 1] = "'";

  // Sides
  for (let r = 1; r < FACE_HEIGHT - 1; r++) {
    grid[r][0] = "|";
    grid[r][FACE_WIDTH - 1] = "|";
  }

  // ── Eyes ── row 3, cols 3 and 7 (with pupil offset)
  const eyeRow = 3;
  const eyeLCol = 3;
  const eyeRCol = 7;

  // Clamp pupil offset so eyes stay within the face
  const clampedDx = Math.max(-1, Math.min(1, pupilDx));
  const clampedDy = Math.max(-1, Math.min(1, pupilDy));

  const lRow = Math.max(2, Math.min(eyeRow + clampedDy, 4));
  const lCol = Math.max(2, Math.min(eyeLCol + clampedDx, 4));
  const rRow = Math.max(2, Math.min(eyeRow + clampedDy, 4));
  const rCol = Math.max(6, Math.min(eyeRCol + clampedDx, 8));

  grid[lRow][lCol] = eyeChars.left;
  grid[rRow][rCol] = eyeChars.right;

  // ── Mouth ── row 6, cols 4-6
  const mouthRow = 6;
  grid[mouthRow][4] = expression.mouth[0];
  grid[mouthRow][5] = expression.mouth[1];
  grid[mouthRow][6] = expression.mouth[2];

  return grid;
};

const AsciiBuddy = ({ inView }: { inView: boolean }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [expressionIdx, setExpressionIdx] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  // Smooth the mouse for less jitter
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  const { dx, dy } = usePupilOffset(containerRef, smoothX, smoothY);

  // Track raw values for the grid render
  const [pupilDx, setPupilDx] = useState(0);
  const [pupilDy, setPupilDy] = useState(0);

  useEffect(() => {
    const unsubX = dx.on("change", (v) => {
      setPupilDx(v);
    });
    const unsubY = dy.on("change", (v) => {
      setPupilDy(v);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [dx, dy]);

  // Global mouse tracking
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [mouseX, mouseY]);

  // Blink cycle — random interval 2-5s
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, BLINK_DURATION);
      // Next blink in 2-5s
      timeout = setTimeout(blink, 2000 + ((Date.now() * 7) % 3000));
    };
    timeout = setTimeout(blink, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Expression cycle — every 4-8s, skip when hovered
  useEffect(() => {
    if (isHovered) {
      return;
    }
    const interval = setInterval(
      () => {
        setExpressionIdx(
          (prev) => (prev + 1 + ((Date.now() * 3) % 2)) % EXPRESSIONS.length
        );
      },
      4000 + ((Date.now() * 11) % 4000)
    );
    return () => {
      clearInterval(interval);
    };
  }, [isHovered]);

  // On hover: show excited expression
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setExpressionIdx(5); // "excited"
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setExpressionIdx(0); // back to "chillin"
  }, []);

  const expression = EXPRESSIONS[expressionIdx];
  const eyeChars = getEyeChars(expression, isBlinking);

  const grid = useMemo(
    () => buildFaceGrid(expression, eyeChars, pupilDx, pupilDy),
    [expression, eyeChars, pupilDx, pupilDy]
  );

  const flatChars = useMemo(
    () =>
      grid.flatMap((row, ri) =>
        row.map((char, ci) => ({
          char,
          id: `${String(ri)}-${String(ci)}`,
          isStructure:
            char === "|" || char === "-" || char === "." || char === "'",
          isEye:
            char === eyeChars.left &&
            (ci === 3 ||
              ci === 7 ||
              ci === 2 ||
              ci === 4 ||
              ci === 6 ||
              ci === 8),
          isMouth: ri === 6 && ci >= 4 && ci <= 6,
        }))
      ),
    [grid, eyeChars]
  );

  return (
    <motion.div
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2,
      }}
    >
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: decorative ASCII art with hover enhancement */}
      <figure
        aria-label={`ASCII buddy feeling ${expression.label}`}
        className="group cursor-crosshair select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <div
          className="grid font-mono text-black leading-none"
          style={{
            gridTemplateColumns: `repeat(${String(FACE_WIDTH)}, 1ch)`,
            gridTemplateRows: `repeat(${String(FACE_HEIGHT)}, 1.4em)`,
            fontSize: "14px",
          }}
        >
          {flatChars.map((cell) => {
            let cellClass = "text-transparent";
            if (cell.isStructure) {
              cellClass =
                "text-black/[0.12] transition-colors duration-500 group-hover:text-black/[0.25]";
            } else if (cell.isEye) {
              cellClass =
                "text-black/40 transition-colors duration-300 group-hover:text-black/70";
            } else if (cell.isMouth) {
              cellClass =
                "text-black/30 transition-colors duration-300 group-hover:text-black/60";
            }
            return (
              <span className={cellClass} key={cell.id}>
                {cell.char}
              </span>
            );
          })}
        </div>
      </figure>
      <motion.span
        animate={{ opacity: isHovered ? 0.5 : 0.2 }}
        className="font-mono text-[10px] text-black tracking-[0.15em]"
        transition={{ duration: 0.3 }}
      >
        [{expression.label}]
      </motion.span>
    </motion.div>
  );
};

// ─── Footer Data ─────────────────────────────────────────────────────────────

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/tutankhAman" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
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

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer
      className="relative w-full overflow-hidden bg-white text-black"
      ref={footerRef}
    >
      {/* Thin top border */}
      <div className="mx-auto w-[calc(100%-2rem)] border-black/[0.08] border-t" />

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
              {PROJECTS.map((p, i) => (
                <StaggeredLine index={i + 1} inView={inView} key={p.label}>
                  <div className="group cursor-pointer">
                    <span className="font-mono text-[13px] text-black/50 transition-colors duration-300 group-hover:text-black">
                      {p.label}
                    </span>
                    <span className="ml-2 font-mono text-[10px] text-black/20 transition-colors duration-300 group-hover:text-black/40">
                      {p.description}
                    </span>
                  </div>
                </StaggeredLine>
              ))}
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
                    href="mailto:hello@aman.dev"
                  >
                    hello@aman.dev
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
          <h2 className="select-none font-generalsans font-medium text-[clamp(80px,20vw,280px)] text-black leading-[0.85] tracking-tighter">
            aman
          </h2>
        </motion.div>
        <div className="mb-2 hidden md:block">
          <AsciiBuddy inView={inView} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mt-2 border-black/[0.06] border-t py-5">
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

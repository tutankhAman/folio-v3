import {
  type MotionValue,
  motion,
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

// The grid of characters representing the face, 9 rows x 21 cols
// Positions are (row, col), eyes at (2,6) and (2,14), mouth at (5,9..11)
const FACE_WIDTH = 21;
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

  // ── Eyes ── row 3, cols 6 and 14 (with pupil offset)
  const eyeRow = 3;
  const eyeLCol = 6;
  const eyeRCol = 14;

  // Clamp pupil offset so eyes stay within the face
  const clampedDx = Math.max(-1, Math.min(1, pupilDx));
  const clampedDy = Math.max(-1, Math.min(1, pupilDy));

  const lRow = Math.max(2, Math.min(eyeRow + clampedDy, 4));
  const lCol = Math.max(5, Math.min(eyeLCol + clampedDx, 7));
  const rRow = Math.max(2, Math.min(eyeRow + clampedDy, 4));
  const rCol = Math.max(13, Math.min(eyeRCol + clampedDx, 15));

  grid[lRow][lCol] = eyeChars.left;
  grid[rRow][rCol] = eyeChars.right;

  // ── Mouth ── row 6, cols 9-11
  const mouthRow = 6;
  grid[mouthRow][9] = expression.mouth[0];
  grid[mouthRow][10] = expression.mouth[1];
  grid[mouthRow][11] = expression.mouth[2];

  return grid;
};

export const AsciiBuddy = ({ inView }: { inView: boolean }) => {
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
            (ci === 6 ||
              ci === 14 ||
              ci === 5 ||
              ci === 7 ||
              ci === 13 ||
              ci === 15),
          isMouth: ri === 6 && ci >= 9 && ci <= 11,
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
                "text-black/[0.25] transition-colors duration-500 group-hover:text-black/[0.45]";
            } else if (cell.isEye) {
              cellClass =
                "text-black/80 transition-colors duration-300 group-hover:text-black";
            } else if (cell.isMouth) {
              cellClass =
                "text-black/75 transition-colors duration-300 group-hover:text-black";
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
        animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        className="font-mono text-[10px] text-black tracking-[0.15em]"
        transition={{ duration: 0.3 }}
      >
        [{expression.label}]
      </motion.span>
    </motion.div>
  );
};

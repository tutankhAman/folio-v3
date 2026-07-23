import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type React from "react";
import { useLayoutEffect, useRef, useState } from "react";

export interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

export interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

export interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>
): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping,
    stiffness,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) {
      return "0px";
    }
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans: React.ReactNode[] = [];
  const copiesCount = numCopies ?? 6;
  for (let i = 0; i < copiesCount; i++) {
    spans.push(
      <span
        className={`shrink-0 ${className}`}
        key={`velocity-copy-${String(i)}`}
        ref={i === 0 ? copyRef : null}
      >
        {children}&nbsp;
      </span>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${parallaxClassName}`}
      style={parallaxStyle}
    >
      <motion.div
        className={`flex whitespace-nowrap text-center font-bold font-sans text-4xl tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem] ${scrollerClassName}`}
        style={{ x, ...scrollerStyle }}
      >
        {spans}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
}: ScrollVelocityProps) {
  return (
    <section>
      {texts.map((text, index) => {
        const textKey =
          typeof text === "string" ? text : `velocity-row-${String(index)}`;
        return (
          <VelocityText
            baseVelocity={index % 2 !== 0 ? -velocity : velocity}
            className={className}
            damping={damping}
            key={textKey}
            numCopies={numCopies}
            parallaxClassName={parallaxClassName}
            parallaxStyle={parallaxStyle}
            scrollContainerRef={scrollContainerRef}
            scrollerClassName={scrollerClassName}
            scrollerStyle={scrollerStyle}
            stiffness={stiffness}
            velocityMapping={velocityMapping}
          >
            {text}
          </VelocityText>
        );
      })}
    </section>
  );
}

export default ScrollVelocity;

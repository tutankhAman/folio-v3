import { type HTMLMotionProps, motion } from "motion/react";
import type React from "react";

// ─── Custom Motion Design Curves & Springs ────────────────────────────────────

export const EASE_EMPHASIZED = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export const SPRING_TACTILE = {
  type: "spring",
  stiffness: 380,
  damping: 26,
  mass: 0.8,
} as const;

// ─── Refined Masked Text Line Reveal ────────────────────────────────────────

export function MaskedReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: EASE_EMPHASIZED,
          delay,
        }}
        viewport={{ once: true, margin: "-40px" }}
        whileInView={{ y: "0%", opacity: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Staggered Parent Container for Cards & Grids ────────────────────────────

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.04,
  delayChildren = 0.05,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Child Item inside StaggerContainer ─────────────────────────────────────

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 14, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: EASE_EMPHASIZED,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Image Reveal Animation ──────────────────────────────────────────────────

export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.04 }}
      transition={{
        duration: 0.75,
        ease: EASE_EMPHASIZED,
        delay,
      }}
      viewport={{ once: true, margin: "-40px" }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      {children}
    </motion.div>
  );
}

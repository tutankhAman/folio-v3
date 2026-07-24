import { ArrowUpRight, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

// ─── Contact Dropdown Items ──────────────────────────────────────────────────

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const CONTACT_ITEMS = [
  {
    label: "Email",
    href: "mailto:amanaziz2020@gmail.com",
    icon: Mail,
    detail: "amanaziz2020@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/tutankhAman",
    external: true,
    icon: GithubIcon,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/amancooks",
    external: true,
    icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aman-aziz",
    external: true,
    icon: LinkedinIcon,
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isStoryActive = location.pathname === "/";
  const isTldrActive = location.pathname === "/tldr";

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setContactOpen(false);
  }, []);

  const handleStoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    closeMobile();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        contactBtnRef.current &&
        !contactBtnRef.current.contains(e.target as Node)
      ) {
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggleContact = useCallback(() => {
    setContactOpen((prev) => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
    setContactOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        animate={{ opacity: 1, y: 0 }}
        aria-label="Main navigation"
        className={cn(
          "fixed top-6 left-1/2 z-40 w-[90%] max-w-4xl -translate-x-1/2",
          "border border-fg/10 bg-surface-elevated backdrop-blur-xl",
          "transition-[width,height,border-radius,background-color,border-color] duration-500"
        )}
        initial={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 1.2,
        }}
      >
        <div className="relative flex h-14 items-center justify-between px-6">
          {/* Left — Logo / Name */}
          <a
            className="font-generalsans font-medium text-fg/90 text-lg tracking-tight transition-transform duration-300 hover:scale-105 active:scale-95"
            href="/"
          >
            Aman.
          </a>

          {/* Center — Desktop Nav */}
          <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 md:flex">
            {/* Story */}
            <a
              className={cn(
                "relative border border-dashed px-3 py-1 font-mono text-xs uppercase transition-all duration-200",
                isStoryActive
                  ? "border-neutral-400 bg-neutral-100/70 font-medium text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              )}
              href="/"
              onClick={handleStoryClick}
              onMouseEnter={() => setHoveredLink("story")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">Story</span>
              {hoveredLink === "story" && !isStoryActive && (
                <motion.div
                  className="absolute inset-0 z-0 rounded bg-fg/[0.04]"
                  layoutId="navbar-hover"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
            </a>

            {/* tl;dr */}
            <a
              className={cn(
                "relative border border-dashed px-3 py-1 font-mono text-xs uppercase transition-all duration-200",
                isTldrActive
                  ? "border-neutral-400 bg-neutral-100/70 font-medium text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              )}
              href="/tldr"
              onMouseEnter={() => setHoveredLink("tldr")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="relative z-10">tl;dr</span>
              {hoveredLink === "tldr" && !isTldrActive && (
                <motion.div
                  className="absolute inset-0 z-0 rounded bg-fg/[0.04]"
                  layoutId="navbar-hover"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
            </a>

            {/* Theme Toggle */}
            <button
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              className="relative border border-transparent px-3 py-1 font-mono text-neutral-500 text-xs uppercase transition-colors hover:text-neutral-900"
              onClick={toggleTheme}
              onMouseEnter={() => setHoveredLink("theme")}
              onMouseLeave={() => setHoveredLink(null)}
              type="button"
            >
              <span className="relative z-10">
                {theme === "light" ? "Light" : "Dark"}
              </span>
              {hoveredLink === "theme" && (
                <motion.div
                  className="absolute inset-0 z-0 rounded bg-fg/[0.04]"
                  layoutId="navbar-hover"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
            </button>
          </div>

          {/* Right — Contact */}
          <div className="hidden items-center md:flex">
            <div className="relative">
              <button
                aria-expanded={contactOpen}
                aria-haspopup="true"
                className={cn(
                  "group flex cursor-pointer items-center gap-1.5 border border-dashed px-3 py-1 font-mono text-xs uppercase transition-all duration-200",
                  contactOpen
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-300 bg-neutral-50/50 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                )}
                onClick={toggleContact}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleContact();
                  }
                }}
                ref={contactBtnRef}
                type="button"
              >
                <span>Contact</span>
                <motion.svg
                  animate={{ rotate: contactOpen ? 180 : 0 }}
                  aria-hidden="true"
                  className="h-2.5 w-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  viewBox="0 0 12 12"
                >
                  <path d="M3 5l3 3 3-3" />
                </motion.svg>
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-full right-0 mt-3 w-56 overflow-hidden border border-neutral-300 border-dashed bg-white shadow-xl backdrop-blur-md"
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    ref={dropdownRef}
                    role="menu"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    <div className="space-y-0.5 p-1.5">
                      {CONTACT_ITEMS.map((item) => (
                        <a
                          className="group flex items-center justify-between border border-transparent border-dashed px-3 py-2 font-mono text-neutral-600 text-xs transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                          href={item.href}
                          key={item.label}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          role="menuitem"
                          target={item.external ? "_blank" : undefined}
                        >
                          <span className="truncate">{item.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 group-hover:text-neutral-800" />
                        </a>
                      ))}
                    </div>
                    {/* Bottom status accent */}
                    <div className="flex items-center justify-between border-neutral-200 border-t border-dashed bg-neutral-50/50 px-3.5 py-2 font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        <span>Open to work</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile — Hamburger */}
          <button
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
            onClick={toggleMobile}
            type="button"
          >
            <motion.span
              animate={
                mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }
              }
              className="block h-px w-4 bg-fg/50"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
              }
              className="block h-px w-4 bg-fg/50"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-35 bg-surface"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mx-auto flex h-full w-[calc(100%-2rem)] max-w-4xl flex-col justify-between border-fg/[0.08] border-x border-dashed px-4 pt-24 pb-6 sm:px-6 sm:pt-28 sm:pb-10">
              <div className="mb-6 border-fg/[0.08] border-b border-dashed pb-4">
                <div className="flex items-center justify-between font-mono text-[10px] text-fg/30 uppercase tracking-[0.18em]">
                  <span>Menu / 03</span>
                  <span>Mobile interface</span>
                </div>
              </div>
              {/* Nav items */}
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2"
              >
                {/* Story */}
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -12 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.1,
                  }}
                >
                  <a
                    className="group flex items-center gap-3 border border-fg/[0.08] border-dashed bg-fg/[0.02] px-4 py-4 font-serif text-2xl text-fg/60 tracking-tight transition-colors duration-300 hover:border-fg/20 hover:bg-fg/[0.04] hover:text-fg"
                    href="/"
                    onClick={handleStoryClick}
                  >
                    <span className="flex h-6 w-6 items-center justify-center border border-fg/[0.12] border-dashed font-mono text-[9px] text-fg/30 uppercase tracking-[0.1em]">
                      01
                    </span>
                    Story
                  </a>
                </motion.div>

                {/* tl;dr */}
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -12 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.15,
                  }}
                >
                  <a
                    className="group flex items-center justify-between border border-fg/[0.08] border-dashed bg-fg/[0.02] px-4 py-4 transition-colors duration-300 hover:border-fg/20 hover:bg-fg/[0.04]"
                    href="/tldr"
                    onClick={closeMobile}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center border border-fg/[0.12] border-dashed font-mono text-[9px] text-fg/30 uppercase tracking-[0.1em]">
                        02
                      </span>
                      <span className="font-serif text-2xl text-fg/60 tracking-tight transition-colors group-hover:text-fg">
                        tl;dr
                      </span>
                    </span>
                  </a>
                </motion.div>

                {/* Theme Toggle — mobile */}
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -12 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.18,
                  }}
                >
                  <button
                    className="group flex w-full items-center gap-3 border border-fg/[0.08] border-dashed bg-fg/[0.02] px-4 py-4 font-serif text-2xl text-fg/60 tracking-tight transition-colors duration-300 hover:border-fg/20 hover:bg-fg/[0.04] hover:text-fg"
                    onClick={toggleTheme}
                    type="button"
                  >
                    <span className="flex h-6 w-6 items-center justify-center border border-fg/[0.12] border-dashed font-mono text-[9px] text-fg/30 uppercase tracking-[0.1em]">
                      ◐
                    </span>
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                  </button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

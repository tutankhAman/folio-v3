import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Contact Dropdown Items ──────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    label: "Email",
    href: "mailto:aman@itssingularity.com",
    detail: "aman@itssingularity.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/tutankhAman",
    external: true,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/amancooks",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aman-aziz",
    external: true,
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

export const Navbar = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

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

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setContactOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        animate={{ opacity: 1, y: 0 }}
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 right-0 left-0 z-40 border-black/[0.08] border-b border-dashed bg-white/80 backdrop-blur-md transition-[border-color] duration-500"
        )}
        initial={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.7,
          ease: [0.76, 0, 0.24, 1],
          delay: 1.8,
        }}
      >
        <div className="relative mx-auto flex h-12 max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-8">
          {/* Left — Logo / Name */}
          <a
            className="font-generalsans font-medium text-base text-black/80 tracking-tight transition-colors duration-300 hover:text-black"
            href="/"
          >
            Aman.
          </a>

          {/* Center — Desktop Nav */}
          <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-4 md:flex">
            {/* Projects */}
            <a
              className="group flex items-center gap-1.5 px-3 py-1.5 font-satoshi text-base text-black/40 transition-colors duration-300 hover:text-black"
              href="/projects"
            >
              <span className="inline-block h-px w-0 bg-black/40 transition-all duration-300 group-hover:w-3" />
              Projects
            </a>

            {/* Concise Version — prominent CTA */}
            <a
              className="group flex items-center gap-1.5 px-3 py-1.5 font-satoshi font-semibold text-base text-black/80 transition-colors duration-300 hover:text-black"
              href="/resume"
            >
              <span className="inline-block h-px w-0 bg-black/40 transition-all duration-300 group-hover:w-3" />
              Résumé
            </a>

            {/* Theme Placeholder */}
            <button
              className="group flex items-center gap-1.5 px-3 py-1.5 font-satoshi text-base text-black/40 transition-colors duration-300 hover:text-black"
              type="button"
            >
              <span className="inline-block h-px w-0 bg-black/40 transition-all duration-300 group-hover:w-3" />
              Light
            </button>
          </div>

          {/* Right — Contact */}
          <div className="hidden items-center md:flex">
            {/* Contact — with dropdown */}
            <div className="relative">
              <button
                aria-expanded={contactOpen}
                aria-haspopup="true"
                className={cn(
                  "group flex cursor-pointer items-center gap-1.5 px-3 py-1.5 font-satoshi text-base transition-colors duration-300",
                  contactOpen ? "text-black" : "text-black/40 hover:text-black"
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
                Contact
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
                    className="absolute top-full right-0 mt-2 w-56 origin-top-right border border-black/[0.08] border-dashed bg-white/95 backdrop-blur-md"
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    ref={dropdownRef}
                    role="menu"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    <div className="p-1.5">
                      {CONTACT_ITEMS.map((item) => (
                        <a
                          className="group flex items-center justify-between px-3 py-2.5 font-mono text-[12px] text-black/40 transition-colors duration-200 hover:bg-black/[0.03] hover:text-black"
                          href={item.href}
                          key={item.label}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          role="menuitem"
                          target={item.external ? "_blank" : undefined}
                        >
                          <span className="flex items-center gap-2">
                            <span className="inline-block h-px w-0 bg-black/30 transition-all duration-300 group-hover:w-2" />
                            {item.label}
                          </span>
                          {item.external && (
                            <svg
                              aria-hidden="true"
                              className="h-2.5 w-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-40"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 12 12"
                            >
                              <path d="M2 10L10 2M10 2H5M10 2v5" />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                    {/* Bottom accent */}
                    <div className="border-black/[0.06] border-t border-dashed px-4 py-2.5">
                      <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.15em]">
                        Open to work
                      </span>
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
              className="block h-px w-4 bg-black/50"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }
              }
              className="block h-px w-4 bg-black/50"
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
            className="fixed inset-0 z-35 bg-white"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex h-full flex-col justify-between px-6 pt-20 pb-10">
              {/* Nav items */}
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1"
              >
                {/* Projects */}
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
                    className="group flex items-center gap-3 border-black/[0.06] border-b border-dashed py-5 font-generalsans font-light text-[28px] text-black/60 tracking-tight transition-colors duration-300 hover:text-black"
                    href="/projects"
                    onClick={closeMobile}
                  >
                    <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.2em]">
                      01
                    </span>
                    Projects
                  </a>
                </motion.div>

                {/* Concise Version — prominent */}
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
                    className="group flex items-center justify-between border-black/[0.06] border-b border-dashed py-5"
                    href="/resume"
                    onClick={closeMobile}
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.2em]">
                        02
                      </span>
                      <span className="font-generalsans font-light text-[28px] text-black tracking-tight">
                        Résumé
                      </span>
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] text-black/30 uppercase tracking-[0.15em]">
                      Concise
                      <svg
                        aria-hidden="true"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 12 12"
                      >
                        <path d="M2 10L10 2M10 2H5M10 2v5" />
                      </svg>
                    </span>
                  </a>
                </motion.div>

                {/* Contact — expanded inline on mobile */}
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -12 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2,
                  }}
                >
                  <div className="border-black/[0.06] border-b border-dashed py-5">
                    <span className="flex items-center gap-3 font-generalsans font-light text-[28px] text-black/60 tracking-tight">
                      <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.2em]">
                        03
                      </span>
                      Contact
                    </span>
                    {/* Sub-links */}
                    <div className="mt-5 flex flex-col gap-3 pl-10">
                      {CONTACT_ITEMS.map((item, i) => (
                        <motion.a
                          animate={{ opacity: 1, x: 0 }}
                          className="group flex items-center gap-2 font-mono text-[13px] text-black/40 transition-colors duration-300 hover:text-black"
                          href={item.href}
                          initial={{ opacity: 0, x: -8 }}
                          key={item.label}
                          onClick={closeMobile}
                          rel={
                            item.external ? "noopener noreferrer" : undefined
                          }
                          target={item.external ? "_blank" : undefined}
                          transition={{
                            duration: 0.4,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.25 + i * 0.04,
                          }}
                        >
                          <span className="inline-block h-px w-0 bg-black/30 transition-all duration-300 group-hover:w-3" />
                          {item.label}
                          {item.external && (
                            <svg
                              aria-hidden="true"
                              className="h-2 w-2 opacity-30"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 12 12"
                            >
                              <path d="M2 10L10 2M10 2H5M10 2v5" />
                            </svg>
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </nav>

              {/* Bottom — status */}
              <motion.div
                animate={{ opacity: 1 }}
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.4,
                }}
              >
                <span className="flex items-center gap-2 font-mono text-[11px] text-black/25">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/20" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black/40" />
                  </span>
                  Open to work
                </span>
                <span className="font-mono text-[11px] text-black/20">
                  &copy; {new Date().getFullYear()}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

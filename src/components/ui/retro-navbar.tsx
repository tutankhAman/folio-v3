import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { id: "01", label: "DECK", href: "#" },
  { id: "02", label: "ARCHIVES", href: "#" },
  { id: "03", label: "TRANSMISSIONS", href: "#" },
  { id: "04", label: "SYSTEM", href: "#" },
];

export const RetroNavbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-[#FFF0C7]/10 border-b bg-black/80 px-4 py-3 backdrop-blur-md md:px-8">
      {/* Top Decorative Line with Ticks */}
      <div className="absolute top-0 left-0 flex w-full justify-between opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: strictly decorative
          <div className="h-1 w-px bg-[#FFF0C7]" key={i} />
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo / System ID */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-10 w-10 items-center justify-center border border-[#FFF0C7]/20 bg-[#FFF0C7]/5">
            <div className="absolute inset-0 animate-pulse bg-[#FFD700]/5" />
            <div className="h-2 w-2 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-1.5 w-1.5 border-[#FFF0C7] border-t border-l" />
            <div className="absolute top-0 right-0 h-1.5 w-1.5 border-[#FFF0C7] border-t border-r" />
            <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-[#FFF0C7] border-b border-l" />
            <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-[#FFF0C7] border-r border-b" />
          </div>
          <div className="hidden flex-col font-mono text-xs leading-none sm:flex">
            <span className="text-[#FFF0C7] tracking-[0.2em]">
              MAIN_CONSOLE
            </span>
            <span className="text-[#FFD700] text-[10px] opacity-60">
              ONLINE
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              className="relative flex items-center gap-2 font-mono text-[#FFF0C7] text-sm tracking-widest transition-colors hover:text-[#FFD700]"
              href={item.href}
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-[#FFF0C7]/40 text-[10px]">{item.id}</span>
              <span>{item.label}</span>
              {hovered === item.id && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-1 left-0 h-px w-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  layoutId="nav-underline"
                />
              )}
            </a>
          ))}
        </div>

        {/* Right Side Status / Time */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="flex flex-col items-end text-[10px]">
            <span className="font-mono text-[#FFF0C7]/40">SYS.TIME</span>
            <span className="font-mono text-[#FFD700]">
              {new Date().toISOString().slice(11, 19)}
            </span>
          </div>
          <div className="h-8 w-px bg-[#FFF0C7]/20" />
          <div className="flex gap-1">
            <div className="h-2 w-1 bg-[#FFD700]" />
            <div className="h-2 w-1 bg-[#FFD700]" />
            <div className="h-2 w-1 bg-[#FFD700]" />
            <div className="h-2 w-1 bg-[#FFF0C7]/20" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="group relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[#FFF0C7]/20 bg-[#FFF0C7]/5 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
        >
          <div className="h-px w-6 bg-[#FFF0C7] transition-all group-hover:bg-[#FFD700] group-hover:shadow-[0_0_8px_#FFD700]" />
          <div className="h-px w-6 bg-[#FFF0C7] transition-all group-hover:bg-[#FFD700] group-hover:shadow-[0_0_8px_#FFD700]" />
          <div className="h-px w-6 bg-[#FFF0C7] transition-all group-hover:bg-[#FFD700] group-hover:shadow-[0_0_8px_#FFD700]" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="border-[#FFF0C7]/20 border-t bg-black/95 backdrop-blur-xl md:hidden"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <a
                  className="flex items-center gap-4 border-[#FFF0C7]/10 border-b py-4 font-mono text-[#FFF0C7] transition-colors hover:bg-[#FFF0C7]/5 hover:text-[#FFD700]"
                  href={item.href}
                  key={item.id}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-[#FFF0C7]/40 text-xs">[{item.id}]</span>
                  <span className="tracking-widest">{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

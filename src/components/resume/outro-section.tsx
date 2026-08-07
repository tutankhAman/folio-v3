import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

export function OutroSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("amanaziz2020@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative border border-neutral-300 border-dashed bg-neutral-50/50 p-5 text-center transition-colors hover:border-neutral-400 md:p-6">
      {/* Corner Crosshair Accents */}
      <span className="pointer-events-none absolute -top-2.5 -left-2 select-none font-mono text-neutral-400 text-xs">
        +
      </span>
      <span className="pointer-events-none absolute -top-2.5 -right-2 select-none font-mono text-neutral-400 text-xs">
        +
      </span>
      <span className="pointer-events-none absolute -bottom-2.5 -left-2 select-none font-mono text-neutral-400 text-xs">
        +
      </span>
      <span className="pointer-events-none absolute -right-2 -bottom-2.5 select-none font-mono text-neutral-400 text-xs">
        +
      </span>

      {/* Decorative Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
        <span className="select-none font-serif text-[110px] text-neutral-200 leading-none">
          “
        </span>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Memorable Quote */}
        <blockquote className="mx-auto mt-1 max-w-xl font-serif text-neutral-800 text-xl leading-relaxed tracking-tight sm:text-2xl md:text-3xl">
          “El, Psy, Congroo”
        </blockquote>

        <p className="mt-2.5 font-mono text-neutral-400 text-xs uppercase tracking-widest">
          — Hououin Kyouma
        </p>

        {/* Dashed Divider */}
        <div className="mx-auto my-4 max-w-xs border-neutral-200 border-t border-dashed" />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            className="group inline-flex items-center gap-2 border border-neutral-200 bg-white px-4 py-2 font-mono text-neutral-700 text-xs transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            href="mailto:amanaziz2020@gmail.com"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Say Hello</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            className="inline-flex items-center gap-2 border border-neutral-200 bg-white px-4 py-2 font-mono text-neutral-700 text-xs transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            onClick={copyEmail}
            type="button"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <button
            className="inline-flex items-center gap-2 border border-neutral-200 bg-white px-4 py-2 font-mono text-neutral-700 text-xs transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
            onClick={scrollToTop}
            type="button"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}

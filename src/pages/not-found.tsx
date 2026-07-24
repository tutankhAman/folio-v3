import { AsciiBuddy } from "@/components/shared/ascii-buddy";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface px-4 pt-28 pb-10 text-fg sm:px-6">
      <main className="mx-auto flex min-h-[calc(100vh-9.5rem)] w-full max-w-4xl flex-col justify-between border-fg/[0.08] border-x border-dashed">
        <div className="flex items-center justify-between border-fg/[0.08] border-b border-dashed px-4 py-3 font-mono text-[10px] text-fg/30 uppercase tracking-[0.18em] sm:px-8">
          <span>Error / 404</span>
          <span>Page not found</span>
        </div>

        <section className="grid flex-1 items-center gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1fr_0.8fr] md:gap-16 md:py-20">
          <div>
            <p className="font-mono text-[11px] text-fg/35 uppercase tracking-[0.2em]">
              Coordinates unavailable
            </p>
            <h1 className="mt-4 font-serif text-[clamp(6rem,22vw,13rem)] text-fg/80 leading-[0.78] tracking-[-0.08em]">
              404
            </h1>
            <p className="mt-8 max-w-md font-poppins text-fg/50 text-sm leading-relaxed sm:text-base">
              This page wandered off somewhere between the interface and the
              internet. Let&apos;s get you back to something useful.
            </p>
            <a
              className="mt-8 inline-flex items-center border border-fg/[0.12] border-dashed bg-fg/[0.02] px-4 py-3 font-mono text-[11px] text-fg/60 uppercase tracking-[0.14em] transition-colors hover:border-fg/25 hover:bg-fg/[0.06] hover:text-fg"
              href="/"
            >
              Return to story
            </a>
          </div>

          <div className="flex min-h-64 items-center justify-center border border-fg/[0.08] border-dashed bg-fg/[0.02] p-8 sm:min-h-80">
            <AsciiBuddy expressionHint={3} inView />
          </div>
        </section>

        <div className="flex items-center justify-between border-fg/[0.08] border-t border-dashed px-4 py-3 font-mono text-[10px] text-fg/25 uppercase tracking-[0.16em] sm:px-8">
          <span>Nothing here</span>
          <span>Try another route</span>
        </div>
      </main>
    </div>
  );
}

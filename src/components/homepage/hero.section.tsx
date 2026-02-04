import { RetroTerminal } from "../ui/retro-terminal";
import { SciFiConsole } from "../ui/sci-fi-console";
import { StatusCarousel } from "../ui/status-carousel";

const carouselItems = [
  "ENGINE SEQUENCE INITIATED",
  "PRIMARY THRUST ONLINE",
  "REACTOR CORE STABLE",
  "NAVIGATION LOCKED",
  "STARDRIVE CHARGING",
  "HYPERLANE ACQUIRED",
  "FUEL MIX NOMINAL",
  "LIFE SUPPORT GREEN",
];

const RetroBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
    {/* Deep Space Gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#000000] opacity-80" />

    {/* Retro Planet/Sun Glow (Bottom Center) */}
    <div className="absolute -bottom-[40%] left-1/2 h-[80vh] w-[150vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/10 via-[#FFD700]/5 to-transparent blur-3xl" />

    {/* Top Right Nebula/Light Source */}
    <div className="absolute -top-[20%] -right-[20%] h-[60vh] w-[60vh] rounded-full bg-[#FFF0C7]/5 blur-3xl" />

    {/* Perspective Grid (Floor) */}
    <div
      className="absolute -right-[50%] bottom-0 -left-[50%] h-[50vh] opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, #FFF0C7 1px, transparent 1px),
          linear-gradient(to bottom, #FFF0C7 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        transform: "perspective(500px) rotateX(60deg)",
        transformOrigin: "bottom center",
        maskImage: "linear-gradient(to top, black, transparent)",
      }}
    />

    {/* Horizon Line */}
    <div className="absolute right-0 bottom-[20vh] left-0 h-px bg-gradient-to-r from-transparent via-[#FFF0C7]/20 to-transparent" />

    {/* Static Stars */}
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
        backgroundSize: "50px 50px, 90px 90px",
        backgroundPosition: "0 0, 25px 25px",
      }}
    />

    {/* Subtle CRT Grain */}
    <div className="pointer-events-none absolute inset-0 bg-[length:100%_4px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-repeat opacity-20" />
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative mx-auto flex h-dvh w-dvw flex-col items-center justify-end gap-8 overflow-hidden bg-black">
      <RetroBackground />

      <div className="relative z-10 mb-4 flex h-64 w-[80dvw] max-w-310 gap-4 md:h-80 lg:h-96">
        <div className="relative flex-1 overflow-hidden rounded-lg border-2 border-[#FFF0C7]/20 bg-black/40 backdrop-blur-sm">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 z-20 h-4 w-4 rounded-tl-sm border-[#FFF0C7] border-t-2 border-l-2" />
          <div className="absolute top-0 right-0 z-20 h-4 w-4 rounded-tr-sm border-[#FFF0C7] border-t-2 border-r-2" />
          <div className="absolute bottom-0 left-0 z-20 h-4 w-4 rounded-bl-sm border-[#FFF0C7] border-b-2 border-l-2" />
          <div className="absolute right-0 bottom-0 z-20 h-4 w-4 rounded-br-sm border-[#FFF0C7] border-r-2 border-b-2" />

          <SciFiConsole />
        </div>
        <div className="relative flex-1 overflow-hidden rounded-lg border-2 border-[#FFF0C7]/20 bg-black/40 backdrop-blur-sm">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 z-20 h-4 w-4 rounded-tl-sm border-[#FFF0C7] border-t-2 border-l-2" />
          <div className="absolute top-0 right-0 z-20 h-4 w-4 rounded-tr-sm border-[#FFF0C7] border-t-2 border-r-2" />
          <div className="absolute bottom-0 left-0 z-20 h-4 w-4 rounded-bl-sm border-[#FFF0C7] border-b-2 border-l-2" />
          <div className="absolute right-0 bottom-0 z-20 h-4 w-4 rounded-br-sm border-[#FFF0C7] border-r-2 border-b-2" />

          <RetroTerminal />
        </div>
      </div>
      <StatusCarousel items={carouselItems} separator="◌" speed={25} />
      <div className="mb-10 flex w-[80dvw] max-w-310 flex-col items-center justify-center gap-6">
        {/* Identity / Role Header */}
        <div className="relative flex w-full max-w-2xl flex-col items-center gap-2">
          {/* Decorative Top Lines */}
          <div className="flex w-full items-center gap-4 opacity-70">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FFF0C7]/50" />
            <div className="font-mono text-[#FFD700] text-[10px] uppercase tracking-[0.5em]">
              SYS.ID.2049_ALPHA
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FFF0C7]/50" />
          </div>

          {/* Role Badge */}
          <div className="relative border border-[#FFF0C7]/20 bg-[#FFF0C7]/5 px-6 py-2 backdrop-blur-md transition-all duration-300 hover:border-[#FFD700]/50 hover:bg-[#FFF0C7]/10">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 h-1.5 w-1.5 border-[#FFF0C7] border-t border-l" />
            <div className="absolute top-0 right-0 h-1.5 w-1.5 border-[#FFF0C7] border-t border-r" />
            <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-[#FFF0C7] border-b border-l" />
            <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-[#FFF0C7] border-r border-b" />

            <h2 className="flex items-center gap-3 font-mono text-[#FFF0C7] text-sm tracking-[0.2em] md:text-lg">
              <span className="text-[#FFD700] opacity-80">[</span>
              <span>DEVELOPER</span>
              <span className="h-1 w-1 rounded-full bg-[#FFD700]" />
              <span>DESIGNER</span>
              <span className="text-[#FFD700] opacity-80">]</span>
            </h2>
          </div>
        </div>

        {/* Name Display */}
        <div className="relative w-full">
          {/* Tactical Brackets */}
          <div className="absolute -top-4 -left-4 h-16 w-16 border-[#FFF0C7]/30 border-t-2 border-l-2" />
          <div className="absolute -top-4 -right-4 h-16 w-16 border-[#FFF0C7]/30 border-t-2 border-r-2" />
          <div className="absolute -bottom-4 -left-4 h-16 w-16 border-[#FFF0C7]/30 border-b-2 border-l-2" />
          <div className="absolute -right-4 -bottom-4 h-16 w-16 border-[#FFF0C7]/30 border-r-2 border-b-2" />

          {/* Name Text */}
          <h1 className="relative z-10 text-center font-title text-[#FFF0C7] text-[6rem] leading-none tracking-tighter md:text-[10rem] lg:text-[28rem]">
            {/* Glow/Shadow Layer
            <span
              aria-hidden="true"
              className="absolute inset-0 z-0 select-none text-[#FFF0C7]/20 blur-sm"
            >
              AMAN
            </span> */}
            {/* Main Text */}
            <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,240,199,0.3)]">
              AMAN
            </span>
          </h1>

          {/* Technical Markings */}
          <div className="absolute top-0 -right-8 hidden origin-bottom-left -rotate-90 text-[#FFD700]/60 text-[10px] tracking-widest lg:block">
            PILOT_CLASS_A
          </div>
          <div className="absolute bottom-0 -left-10 hidden origin-top-right -rotate-90 text-[#FFD700]/60 text-[10px] tracking-widest lg:block">
            UNIT_ID_2049_ALPHA
          </div>
        </div>
      </div>
    </section>
  );
};

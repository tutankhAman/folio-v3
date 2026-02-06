export const GridOverlay = () => (
  <svg
    aria-label="Layout grid"
    className="h-full w-full"
    preserveAspectRatio="none"
    role="img"
    viewBox="0 0 100 100"
  >
    {/* Vertical lines */}
    {Array.from({ length: 9 }, (_, i) => (
      <line
        key={`gv-${String(i)}`}
        opacity={0.03}
        stroke="black"
        strokeWidth={0.15}
        x1={(i + 1) * 10}
        x2={(i + 1) * 10}
        y1={0}
        y2={100}
      />
    ))}

    {/* Horizontal lines */}
    {Array.from({ length: 9 }, (_, i) => (
      <line
        key={`gh-${String(i)}`}
        opacity={0.03}
        stroke="black"
        strokeWidth={0.15}
        x1={0}
        x2={100}
        y1={(i + 1) * 10}
        y2={(i + 1) * 10}
      />
    ))}
  </svg>
);

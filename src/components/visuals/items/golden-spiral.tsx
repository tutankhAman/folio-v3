export const GoldenSpiral = () => (
  <svg
    aria-label="Golden spiral"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    viewBox="0 0 300 300"
  >
    {/* Fibonacci rectangles — faint guides */}
    <rect
      fill="none"
      height={200}
      opacity={0.04}
      stroke="black"
      strokeWidth={0.5}
      width={200}
      x={50}
      y={50}
    />
    <rect
      fill="none"
      height={124}
      opacity={0.04}
      stroke="black"
      strokeWidth={0.5}
      width={124}
      x={126}
      y={50}
    />
    <rect
      fill="none"
      height={76}
      opacity={0.04}
      stroke="black"
      strokeWidth={0.5}
      width={76}
      x={126}
      y={50}
    />

    {/* Spiral path */}
    <path
      d="M250,174 A124,124 0 0,1 126,50 A76,76 0 0,1 202,126 A48,48 0 0,1 154,174 A30,30 0 0,1 184,144 A18,18 0 0,1 166,162"
      fill="none"
      opacity={0.1}
      stroke="black"
      strokeWidth={0.75}
    />
  </svg>
);

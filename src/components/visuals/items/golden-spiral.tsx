export const GoldenSpiral = () => (
  <svg
    aria-label="Golden spiral"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    viewBox="0 0 610 377"
  >
    {/* Full Fibonacci rectangle breakdown */}
    <rect
      fill="none"
      height={377}
      opacity={0.05}
      stroke="black"
      strokeWidth={0.4}
      width={610}
      x={0}
      y={0}
    />
    {/* 377×377 square */}
    <line
      opacity={0.05}
      stroke="black"
      strokeWidth={0.4}
      x1={377}
      x2={377}
      y1={0}
      y2={377}
    />
    {/* 233×233 square */}
    <line
      opacity={0.04}
      stroke="black"
      strokeWidth={0.4}
      x1={377}
      x2={610}
      y1={233}
      y2={233}
    />
    {/* 144×144 */}
    <line
      opacity={0.04}
      stroke="black"
      strokeWidth={0.4}
      x1={521}
      x2={521}
      y1={0}
      y2={233}
    />
    {/* 89×89 */}
    <line
      opacity={0.03}
      stroke="black"
      strokeWidth={0.4}
      x1={377}
      x2={521}
      y1={89}
      y2={89}
    />
    {/* 55×55 */}
    <line
      opacity={0.03}
      stroke="black"
      strokeWidth={0.4}
      x1={432}
      x2={432}
      y1={89}
      y2={233}
    />

    {/* The golden spiral — smooth connected quarter-circle arcs */}
    <path
      d="M610,377 A377,377 0 0,1 377,0 A233,233 0 0,0 610,233 A144,144 0 0,1 377,89 A89,89 0 0,0 521,233 A55,55 0 0,1 432,144 A34,34 0 0,0 466,178"
      fill="none"
      opacity={0.14}
      stroke="black"
      strokeWidth={0.75}
    />

    {/* Golden ratio mark at spiral convergence */}
    <circle cx={466} cy={178} fill="black" opacity={0.1} r={2} />
  </svg>
);

export interface VisualConfig {
  id: string;
  component: string;
  className?: string;
}

export const visualFlow: Record<number, VisualConfig[]> = {
  // Stage 2: "I'm a developer"
  2: [
    {
      id: "viz-code-grid",
      component: "code-grid",
      className: "absolute inset-0",
    },
  ],
  // Stage 8: "curiosity about how software actually works"
  8: [
    {
      id: "viz-wireframe",
      component: "wireframe-shape",
      className: "absolute right-[8%] top-[15%] h-48 w-48 md:h-80 md:w-80",
    },
  ],
  // Stage 10: "Learning how experiences should feel"
  10: [
    {
      id: "viz-wave",
      component: "flowing-wave",
      className: "absolute inset-0",
    },
  ],
  // Stage 13: "and balance became the goal"
  13: [
    {
      id: "viz-orbit",
      component: "orbit-dots",
      className: "absolute left-[10%] top-[20%] h-48 w-48 md:h-64 md:w-64",
    },
  ],
  // Stage 18: "simplifying complex problems"
  18: [
    {
      id: "viz-nodes",
      component: "node-graph",
      className: "absolute right-[10%] top-[15%] h-40 w-56 md:h-60 md:w-80",
    },
  ],
};

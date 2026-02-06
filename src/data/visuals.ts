export interface VisualConfig {
  id: string;
  component: string;
  className?: string;
}

export const visualFlow: Record<number, VisualConfig[]> = {
  // Stage 0: "Hey I'm AMAN" — subtle intro presence
  0: [
    {
      id: "viz-intro-pulse",
      component: "pulse-ring",
      className: "absolute right-[12%] top-[18%] h-32 w-32 md:h-48 md:w-48",
    },
  ],

  // Stage 1: "I'm a designer" — golden ratio
  1: [
    {
      id: "viz-designer-spiral",
      component: "golden-spiral",
      className: "absolute inset-0",
    },
  ],

  // Stage 2: "I'm a developer" — code everywhere
  2: [
    {
      id: "viz-code-grid",
      component: "code-grid",
      className: "absolute inset-0",
    },
    {
      id: "viz-dev-cli",
      component: "cli-typing",
      className: "absolute right-[30%] bottom-[40%] h-44 w-64 md:h-56 md:w-80",
    },
    // {
    //   id: "viz-dev-wireframe",
    //   component: "wireframe-shape",
    //   className: "absolute right-[5%] top-[10%] h-32 w-32 md:h-48 md:w-48",
    // },
  ],

  // Stage 3: "I'm a cs undergrad" — academic/binary
  3: [
    {
      id: "viz-cs-binary",
      component: "binary-rain",
      className: "absolute inset-0",
    },
  ],

  // Stage 4: "Co-founder of Singularity Works" — convergence/founding
  4: [
    {
      id: "viz-founder-converge",
      component: "converging-lines",
      className: "absolute inset-0",
    },
    {
      id: "viz-founder-pulse",
      component: "pulse-ring",
      className: "absolute left-[8%] bottom-[15%] h-36 w-36 md:h-52 md:w-52",
    },
  ],

  // Stage 8: "curiosity about how software actually works" — mechanisms
  8: [
    {
      id: "viz-wireframe",
      component: "wireframe-shape",
      className: "absolute right-[8%] top-[15%] h-48 w-48 md:h-80 md:w-80",
    },
    {
      id: "viz-software-code",
      component: "code-grid",
      className: "absolute left-[3%] bottom-[8%] h-40 w-40 md:h-56 md:w-56",
    },
  ],

  // Stage 10: "Learning how experiences should feel" — sensory
  10: [
    {
      id: "viz-wave",
      component: "flowing-wave",
      className: "absolute inset-0",
    },
    // {
    //   id: "viz-feel-pulse",
    //   component: "pulse-ring",
    //   className: "absolute right-[10%] top-[15%] h-36 w-36 md:h-56 md:w-56",
    // },
  ],

  // Stage 13: "and balance became the goal" — dual equilibrium
  13: [
    {
      id: "viz-orbit-left",
      component: "orbit-dots",
      className: "absolute left-[8%] top-[18%] h-48 w-48 md:h-64 md:w-64",
    },
    {
      id: "viz-orbit-right",
      component: "orbit-dots",
      className: "absolute right-[8%] bottom-[18%] h-44 w-44 md:h-60 md:w-60",
    },
  ],

  // Stage 16: "AI inside everyday software" — neural, alongside image
  16: [
    {
      id: "viz-ai-nodes",
      component: "node-graph",
      className: "absolute left-[5%] bottom-[10%] h-40 w-60 md:h-56 md:w-80",
    },
    {
      id: "viz-ai-pulse",
      component: "pulse-ring",
      className: "absolute left-[15%] top-[12%] h-28 w-28 md:h-40 md:w-40",
    },
  ],

  // Stage 18: "simplifying complex problems" — complexity → simplicity
  18: [
    {
      id: "viz-nodes",
      component: "node-graph",
      className: "absolute right-[10%] top-[15%] h-40 w-56 md:h-60 md:w-80",
    },
    {
      id: "viz-simplify-scatter",
      component: "scatter-dots",
      className: "absolute left-[5%] top-[10%] h-48 w-48 md:h-64 md:w-64",
    },
  ],

  // Stage 19: "This is a collection of experiments" — scattered exploration
  19: [
    {
      id: "viz-experiments-scatter",
      component: "scatter-dots",
      className: "absolute inset-0",
    },
    {
      id: "viz-experiments-pulse",
      component: "pulse-ring",
      className: "absolute left-[12%] top-[18%] h-36 w-36 md:h-56 md:w-56",
    },
  ],

  // Stage 20: "a collection of projects" — structured intent
  20: [
    {
      id: "viz-projects-converge",
      component: "converging-lines",
      className: "absolute inset-0",
    },
    {
      id: "viz-projects-crosshair",
      component: "crosshair",
      className: "absolute right-[12%] top-[20%] h-32 w-32 md:h-48 md:w-48",
    },
  ],

  // Stage 21: "a collection of failures" — glitch/static
  21: [
    {
      id: "viz-failures-glitch",
      component: "glitch-lines",
      className: "absolute inset-0",
    },
  ],

  // Stage 22: "a collection of refinements" — converging to clarity
  22: [
    {
      id: "viz-refinements-converge",
      component: "converging-lines",
      className: "absolute inset-0",
    },
    {
      id: "viz-refinements-spiral",
      component: "golden-spiral",
      className:
        "absolute right-[10%] bottom-[15%] h-44 w-44 md:h-64 md:w-64 rotate-6",
    },
  ],

  // Stage 23: "Shipped ideas" — locked on target
  23: [
    {
      id: "viz-shipped-crosshair",
      component: "crosshair",
      className: "absolute inset-0",
    },
  ],

  // Stage 24: "thank you for being here" — warm pulse
  // 24: [
  //   {
  //     id: "viz-thanks-pulse",
  //     component: "pulse-ring",
  //     className:
  //       "absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 md:h-72 md:w-72",
  //   },
  // ],

  // Stage 25: "Conversations, ideas, collaborations welcome" — connections
  25: [
    {
      id: "viz-welcome-nodes",
      component: "node-graph",
      className: "absolute left-[10%] top-[15%] h-44 w-64 md:h-64 md:w-96",
    },
    {
      id: "viz-welcome-pulse",
      component: "pulse-ring",
      className: "absolute right-[10%] bottom-[18%] h-36 w-36 md:h-52 md:w-52",
    },
  ],
};

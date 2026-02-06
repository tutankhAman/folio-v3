import type { ComponentType } from "react";
import { BinaryRain } from "./items/binary-rain";
import { CliRobot } from "./items/cli-robot";
import { CliTyping } from "./items/cli-typing";
import { CodeGrid } from "./items/code-grid";
import { ConvergingLines } from "./items/converging-lines";
import { Crosshair } from "./items/crosshair";
import { FlowingWave } from "./items/flowing-wave";
import { GlitchLines } from "./items/glitch-lines";
import { GoldenSpiral } from "./items/golden-spiral";
import { GridOverlay } from "./items/grid-overlay";
import { NodeGraph } from "./items/node-graph";
import { OrbitDots } from "./items/orbit-dots";
import { PulseRing } from "./items/pulse-ring";
import { ScatterDots } from "./items/scatter-dots";
import { WireframeShape } from "./items/wireframe-shape";

export const visualRegistry: Record<string, ComponentType> = {
  "binary-rain": BinaryRain,
  "cli-robot": CliRobot,
  "cli-typing": CliTyping,
  "code-grid": CodeGrid,
  "converging-lines": ConvergingLines,
  crosshair: Crosshair,
  "flowing-wave": FlowingWave,
  "glitch-lines": GlitchLines,
  "golden-spiral": GoldenSpiral,
  "grid-overlay": GridOverlay,
  "node-graph": NodeGraph,
  "orbit-dots": OrbitDots,
  "pulse-ring": PulseRing,
  "scatter-dots": ScatterDots,
  "wireframe-shape": WireframeShape,
};

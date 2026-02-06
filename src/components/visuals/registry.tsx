import { type ComponentType, lazy } from "react";
import { AsciiBuddy } from "../shared/ascii-buddy";
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

const BinaryRain = lazy(() =>
  import("./items/binary-rain").then((mod) => ({ default: mod.BinaryRain }))
);
const CliTyping = lazy(() =>
  import("./items/cli-typing").then((mod) => ({ default: mod.CliTyping }))
);
const CodeGrid = lazy(() =>
  import("./items/code-grid").then((mod) => ({ default: mod.CodeGrid }))
);
const WireframeShape = lazy(() =>
  import("./items/wireframe-shape").then((mod) => ({
    default: mod.WireframeShape,
  }))
);

export const visualRegistry: Record<string, ComponentType> = {
  "ascii-buddy": () => <AsciiBuddy inView={true} />,
  "binary-rain": BinaryRain,
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

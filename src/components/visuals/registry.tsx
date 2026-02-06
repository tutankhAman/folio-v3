import type { ComponentType } from "react";
import { CodeGrid } from "./items/code-grid";
import { FlowingWave } from "./items/flowing-wave";
import { NodeGraph } from "./items/node-graph";
import { OrbitDots } from "./items/orbit-dots";
import { WireframeShape } from "./items/wireframe-shape";

export const visualRegistry: Record<string, ComponentType> = {
  "code-grid": CodeGrid,
  "flowing-wave": FlowingWave,
  "node-graph": NodeGraph,
  "orbit-dots": OrbitDots,
  "wireframe-shape": WireframeShape,
};

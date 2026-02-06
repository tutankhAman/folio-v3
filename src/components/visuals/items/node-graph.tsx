import { motion } from "motion/react";

const NODES = [
  { id: "n1", cx: 120, cy: 40 },
  { id: "n2", cx: 280, cy: 30 },
  { id: "n3", cx: 380, cy: 100 },
  { id: "n4", cx: 300, cy: 160 },
  { id: "n5", cx: 140, cy: 150 },
  { id: "n6", cx: 220, cy: 90 },
] as const;

type NodeId = (typeof NODES)[number]["id"];

const EDGES: readonly (readonly [NodeId, NodeId])[] = [
  ["n1", "n6"],
  ["n2", "n6"],
  ["n3", "n6"],
  ["n4", "n6"],
  ["n5", "n6"],
  ["n1", "n2"],
  ["n4", "n5"],
] as const;

const nodeMap = new Map<NodeId, (typeof NODES)[number]>(
  NODES.map((n) => [n.id, n])
);

export const NodeGraph = () => (
  <svg
    aria-label="Connected node graph"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    viewBox="0 0 500 200"
  >
    {EDGES.map(([from, to], i) => {
      const a = nodeMap.get(from);
      const b = nodeMap.get(to);
      if (!(a && b)) {
        return null;
      }
      return (
        <motion.line
          animate={{ opacity: 0.08 }}
          initial={{ opacity: 0 }}
          key={`${from}-${to}`}
          stroke="black"
          strokeWidth={0.5}
          transition={{ delay: i * 0.12, duration: 0.8, ease: "easeOut" }}
          x1={a.cx}
          x2={b.cx}
          y1={a.cy}
          y2={b.cy}
        />
      );
    })}
    {NODES.map((node, i) => (
      <motion.circle
        animate={{ opacity: 0.12 }}
        cx={node.cx}
        cy={node.cy}
        fill="black"
        initial={{ opacity: 0 }}
        key={node.id}
        r={2.5}
        transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
      />
    ))}
  </svg>
);

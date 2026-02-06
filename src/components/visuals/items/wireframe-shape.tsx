import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

const RotatingWireframe = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial color="#000000" opacity={0.12} transparent wireframe />
    </mesh>
  );
};

export const WireframeShape = () => (
  <Canvas
    camera={{ position: [0, 0, 4] }}
    style={{ background: "transparent" }}
  >
    <RotatingWireframe />
  </Canvas>
);

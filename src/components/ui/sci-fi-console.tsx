import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  type Group,
  type Mesh,
  type ShaderMaterial,
} from "three";

// --- Shaders ---

const holographicVertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const holographicFragmentShader = `
uniform float uTime;
uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Fresnel effect (rim lighting)
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - dot(viewDir, vNormal), 2.0);

  // Scanline effect
  float scanline = sin(vPosition.y * 10.0 - uTime * 2.0) * 0.1 + 0.9;
  
  // Grid effect
  float gridX = step(0.95, fract(vUv.x * 20.0));
  float gridY = step(0.95, fract(vUv.y * 20.0));
  float grid = max(gridX, gridY) * 0.5;

  // Combine
  float alpha = fresnel + grid;
  alpha *= scanline;
  
  // Pulse
  float pulse = sin(uTime) * 0.2 + 0.8;

  gl_FragColor = vec4(uColor * pulse, alpha * 0.8);
}
`;

// --- 3D Components ---

function HolographicPlanet() {
  const meshRef = useRef<Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color("#FFF0C7") },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      (meshRef.current.material as ShaderMaterial).uniforms.uTime.value =
        state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <shaderMaterial
        blending={AdditiveBlending}
        depthWrite={false}
        fragmentShader={holographicFragmentShader}
        side={DoubleSide}
        transparent
        uniforms={uniforms}
        vertexShader={holographicVertexShader}
      />
    </mesh>
  );
}

function OrbitalRing({
  radius,
  speed,
  rotation,
}: {
  radius: number;
  speed: number;
  rotation: [number, number, number];
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += speed * 0.01;
      ref.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * speed * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius, radius + 0.05, 64]} />
        <meshBasicMaterial
          color="#FFD700"
          opacity={0.3}
          side={DoubleSide}
          transparent
        />
      </mesh>
    </group>
  );
}

// --- Main Component ---

export const SciFiConsole = () => {
  return (
    <div className="relative h-full w-full bg-black/80">
      {/* Retro UI Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-[#FFF0C7]/20 border-b pb-2">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
            <span className="font-bold font-mono text-[#FFF0C7] text-shadow-sm text-xs tracking-[0.2em]">
              NAV_SYSTEM_V.8
            </span>
          </div>
          <span className="font-mono text-[#FFF0C7]/50 text-[10px] tracking-widest">
            SECURE_CONNECTION
          </span>
        </div>

        {/* Crosshairs / Data */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-64 w-64 rounded-full border border-[#FFF0C7]/10" />
          <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform bg-[#FFF0C7]/20" />
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between border-[#FFF0C7]/20 border-t pt-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  className={`h-1 w-4 ${i <= 3 ? "bg-[#FFD700]" : "bg-[#FFF0C7]/20"}`}
                  key={i}
                />
              ))}
            </div>
            <span className="font-mono text-[#FFF0C7]/60 text-[10px]">
              SIGNAL_STRENGTH
            </span>
          </div>
          <span className="animate-pulse font-mono text-[#FFD700] text-xs">
            AWAITING_INPUT_
          </span>
        </div>
      </div>

      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[length:100%_4px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-repeat" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

      <Canvas>
        <PerspectiveCamera fov={50} makeDefault position={[0, 2, 8]} />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />

        <color args={["#050505"]} attach="background" />
        <Stars
          count={5000}
          depth={50}
          factor={4}
          fade
          radius={100}
          saturation={0}
          speed={1}
        />

        <ambientLight intensity={0.2} />
        <pointLight color="#FFD700" intensity={1} position={[10, 10, 10]} />

        <group position={[0, 0, 0]}>
          <HolographicPlanet />
          <OrbitalRing radius={3.5} rotation={[0.2, 0, 0]} speed={1.2} />
          <OrbitalRing radius={4.2} rotation={[-0.2, 0, 0.2]} speed={0.8} />
          <OrbitalRing radius={5.0} rotation={[0, 0, -0.1]} speed={0.5} />

          {/* Connecting Lines / Tactical Grid */}
          <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10, 20, 20]} />
            <meshBasicMaterial
              color="#FFF0C7"
              opacity={0.05}
              transparent
              wireframe
            />
          </mesh>
        </group>

        <fog args={["#000000", 5, 20]} attach="fog" />
      </Canvas>
    </div>
  );
};

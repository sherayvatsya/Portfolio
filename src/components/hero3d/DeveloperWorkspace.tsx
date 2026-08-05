"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Capsule, Cylinder, RoundedBox, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

type TechType = "react" | "javascript" | "node" | "express" | "python" | "mongodb";

interface TechIcon {
  label: string;
  color: string;
  accent?: string;
  type: TechType;
  x: number;
  y: number;
  z: number;
  scale?: number;
}

const TECH_ICONS: TechIcon[] = [
  { label: "React", color: "#61DAFB", type: "react", x: -1.65, y: 2.95, z: 0.18, scale: 1.08 },
  { label: "Node.js", color: "#339933", type: "node", x: -0.55, y: 3.16, z: -0.42 },
  { label: "Express", color: "#E5E7EB", type: "express", x: 0.38, y: 2.78, z: -0.62, scale: 0.95 },
  { label: "JavaScript", color: "#F7DF1E", type: "javascript", x: 1.25, y: 3.08, z: 0.05, scale: 1.06 },
  { label: "Python", color: "#3776AB", accent: "#FFD43B", type: "python", x: 2.05, y: 2.76, z: -0.38 },
  { label: "MongoDB", color: "#47A248", type: "mongodb", x: 0.45, y: 3.32, z: 0.45, scale: 1.12 },
];

function TechLogo({ type, color, accent }: { type: TechType; color: string; accent?: string }) {
  const glow = (
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.15} roughness={0.25} />
  );

  if (type === "react") {
    return (
      <group position={[0, 0, 0.1]}>
        {[0, Math.PI / 3, -Math.PI / 3].map((rotation) => (
          <Torus key={rotation} args={[0.16, 0.008, 10, 48]} rotation={[0, 0, rotation]}>
            {glow}
          </Torus>
        ))}
        <Sphere args={[0.04, 16, 16]}>{glow}</Sphere>
      </group>
    );
  }

  if (type === "javascript") {
    return (
      <group position={[0, 0, 0.1]}>
        <RoundedBox args={[0.32, 0.32, 0.02]} radius={0.025} smoothness={4}>
          {glow}
        </RoundedBox>
        <mesh position={[-0.045, -0.025, 0.025]}>
          <boxGeometry args={[0.03, 0.16, 0.006]} />
          <meshStandardMaterial color="#0a0e17" />
        </mesh>
        <mesh position={[0.045, -0.085, 0.025]}>
          <boxGeometry args={[0.095, 0.03, 0.006]} />
          <meshStandardMaterial color="#0a0e17" />
        </mesh>
        <mesh position={[0.065, -0.01, 0.025]}>
          <boxGeometry args={[0.12, 0.03, 0.006]} />
          <meshStandardMaterial color="#0a0e17" />
        </mesh>
      </group>
    );
  }

  if (type === "node") {
    return (
      <group position={[0, 0, 0.1]}>
        <Cylinder args={[0.18, 0.18, 0.025, 6]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
          {glow}
        </Cylinder>
        <Sphere args={[0.045, 12, 12]} position={[0, 0, 0.035]}>
          <meshStandardMaterial color="#07120b" />
        </Sphere>
      </group>
    );
  }

  if (type === "express") {
    return (
      <group position={[0, 0, 0.1]}>
        <mesh rotation={[0, 0, 0.72]}>
          <boxGeometry args={[0.27, 0.025, 0.012]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.05} />
        </mesh>
        <mesh rotation={[0, 0, -0.72]}>
          <boxGeometry args={[0.27, 0.025, 0.012]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.05} />
        </mesh>
      </group>
    );
  }

  if (type === "python") {
    return (
      <group position={[0, 0, 0.1]}>
        <RoundedBox args={[0.22, 0.14, 0.025]} radius={0.045} smoothness={6} position={[-0.055, 0.045, 0]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.15} roughness={0.25} />
        </RoundedBox>
        <RoundedBox args={[0.22, 0.14, 0.025]} radius={0.045} smoothness={6} position={[0.055, -0.045, 0]}>
          <meshStandardMaterial color={accent || "#FFD43B"} emissive={accent || "#FFD43B"} emissiveIntensity={1.15} roughness={0.25} />
        </RoundedBox>
      </group>
    );
  }

  return (
    <group position={[0, 0, 0.1]}>
      <mesh rotation={[0, 0, -0.35]}>
        <sphereGeometry args={[0.13, 16, 16, 0, Math.PI * 2, 0.18, Math.PI - 0.36]} />
        {glow}
      </mesh>
      <mesh position={[0.02, 0, 0.005]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.015, 0.24, 0.012]} />
        {glow}
      </mesh>
    </group>
  );
}

function CodeGlyph({ color = "#c084fc", scale = 1 }: { color?: string; scale?: number }) {
  return (
    <group scale={scale}>
      <mesh position={[-0.05, 0, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.1, 0.016, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-0.05, -0.055, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.1, 0.016, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.065, -0.026, 0]} rotation={[0, 0, -1.18]}>
        <boxGeometry args={[0.14, 0.016, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.17, 0, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.1, 0.016, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.17, -0.055, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.1, 0.016, 0.006]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}


function useRadialGradientTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.35)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}


function AmbientHalo({
  position,
  color,
  scale,
  opacity = 0.18,
}: {
  position: [number, number, number];
  color: string;
  scale: [number, number, number];
  opacity?: number;
}) {
  const glowTexture = useRadialGradientTexture();
  return (
    <mesh position={position} scale={scale} rotation={[0, 0, 0]}>
      <circleGeometry args={[1, 48]} />
      <meshBasicMaterial
        map={glowTexture}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function VolumetricRay({
  position,
  rotation,
  scale,
  color = "#8b5cf6",
  opacity = 0.1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <coneGeometry args={[0.16, 1, 3, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SoftReflection() {
  return (
    <group position={[0, -0.68, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
      <AmbientHalo position={[0, 0, 0]} color="#7c3aed" scale={[1.85, 0.52, 1]} opacity={0.18} />
      <AmbientHalo position={[0.28, 0.02, 0.01]} color="#22d3ee" scale={[1.1, 0.28, 1]} opacity={0.08} />
      <AmbientHalo position={[-0.4, -0.02, 0.01]} color="#f472b6" scale={[0.95, 0.22, 1]} opacity={0.06} />
    </group>
  );
}

function AtmosphericLayer() {
  return (
    <group>
      <AmbientHalo position={[0.4, 1.15, -1.45]} color="#6d28d9" scale={[3.4, 2.25, 1]} opacity={0.09} />
      <AmbientHalo position={[1.35, 2.65, -1.6]} color="#22d3ee" scale={[1.45, 1.1, 1]} opacity={0.06} />
      <AmbientHalo position={[-1.35, 2.45, -1.55]} color="#c084fc" scale={[1.7, 1.25, 1]} opacity={0.075} />
      <VolumetricRay position={[-0.7, 1.8, -0.65]} rotation={[0.25, 0.1, -0.42]} scale={[0.7, 2.6, 1]} opacity={0.085} />
      <VolumetricRay position={[0.52, 1.92, -0.85]} rotation={[0.2, -0.25, 0.36]} scale={[0.55, 2.25, 1]} opacity={0.075} />
      <VolumetricRay position={[1.15, 1.65, -0.72]} rotation={[0.18, -0.42, 0.08]} scale={[0.45, 1.9, 1]} opacity={0.06} />
    </group>
  );
}

function FloatingBadge({ icon, phase }: { icon: TechIcon; phase: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = icon.y + Math.sin(t + phase) * 0.12;
    ref.current.rotation.y = Math.sin(t * 0.45 + phase) * 0.16;
    ref.current.rotation.z = Math.sin(t * 0.35 + phase) * 0.04;
  });

  return (
    <group ref={ref} position={[icon.x, icon.y, icon.z]} scale={icon.scale || 1}>
      <pointLight color={icon.color} intensity={1.2} distance={1.7} decay={2} />
      <AmbientHalo position={[0, 0, -0.035]} color={icon.color} scale={[0.72, 0.72, 1]} opacity={0.22} />
      <Cylinder args={[0.38, 0.38, 0.12, 6]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <meshStandardMaterial
          color="#11172a"
          emissive={icon.color}
          emissiveIntensity={0.38}
          roughness={0.28}
          metalness={0.3}
          transparent
          opacity={0.86}
        />
      </Cylinder>
      <Torus args={[0.34, 0.011, 6, 6]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial color={icon.color} emissive={icon.color} emissiveIntensity={1.2} roughness={0.2} />
      </Torus>
      <TechLogo type={icon.type} color={icon.color} accent={icon.accent} />
    </group>
  );
}

function Monitor({
  position,
  rotation = [0, 0, 0],
  screenWidth = 1.4,
  screenHeight = 0.9,
  codeColor = "#61DAFB",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  screenWidth?: number;
  screenHeight?: number;
  codeColor?: string;
}) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.62 + Math.sin(state.clock.elapsedTime * 1.5) * 0.14;
  });

  const codeLines = useMemo(() => {
    const colors = [codeColor, "#c084fc", "#22d3ee", "#f472b6", "#818cf8", "#94a3b8"];
    return Array.from({ length: 15 }, (_, i) => ({
      width: 0.18 + ((i * 37) % 10) * 0.055,
      y: screenHeight * 0.32 - i * ((screenHeight * 0.74) / 15),
      xOff: -screenWidth * 0.35 + (i % 4) * 0.07,
      color: colors[i % colors.length],
    }));
  }, [screenWidth, screenHeight, codeColor]);

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[screenWidth + 0.08, screenHeight + 0.08, 0.035]} radius={0.03} smoothness={4} position={[0, 0, -0.02]}>
        <meshStandardMaterial color="#111827" roughness={0.64} metalness={0.42} />
      </RoundedBox>
      <RoundedBox ref={screenRef} args={[screenWidth, screenHeight, 0.04]} radius={0.02} smoothness={4}>
        <meshStandardMaterial color="#060a18" emissive="#25205e" emissiveIntensity={0.62} roughness={0.2} metalness={0.1} />
      </RoundedBox>
      {codeLines.map((line, i) => (
        <mesh key={i} position={[line.xOff + line.width / 2, line.y, 0.026]}>
          <boxGeometry args={[Math.min(line.width, screenWidth * 0.68), 0.018, 0.002]} />
          <meshStandardMaterial color={line.color} emissive={line.color} emissiveIntensity={0.9} transparent opacity={0.78} />
        </mesh>
      ))}
      <Cylinder args={[0.03, 0.04, 0.5, 8]} position={[0, -0.7, -0.05]}>
        <meshStandardMaterial color="#151827" roughness={0.5} metalness={0.6} />
      </Cylinder>
      <Cylinder args={[0.2, 0.22, 0.03, 16]} position={[0, -0.95, -0.05]}>
        <meshStandardMaterial color="#151827" roughness={0.4} metalness={0.6} />
      </Cylinder>
    </group>
  );
}

function Laptop({ position }: { position: [number, number, number] }) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 1.2 + 1) * 0.12;
  });

  return (
    <group position={position}>
      <RoundedBox args={[0.75, 0.035, 0.5]} radius={0.012} smoothness={4}>
        <meshStandardMaterial color="#111827" roughness={0.6} metalness={0.5} />
      </RoundedBox>
      <group position={[0, 0.3, -0.22]} rotation={[-0.3, 0, 0]}>
        <RoundedBox ref={screenRef} args={[0.7, 0.48, 0.02]} radius={0.012} smoothness={4}>
          <meshStandardMaterial color="#060a18" emissive="#1e1b4b" emissiveIntensity={0.5} roughness={0.2} metalness={0.1} />
        </RoundedBox>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[-0.18 + i * 0.08, 0.02 - i * 0.035, 0.018]}>
            <boxGeometry args={[0.16 - (i % 2) * 0.04, 0.012, 0.002]} />
            <meshStandardMaterial color={i % 2 ? "#22d3ee" : "#c084fc"} emissive={i % 2 ? "#22d3ee" : "#c084fc"} emissiveIntensity={0.75} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function RGBKeyboard({ position }: { position: [number, number, number] }) {
  const stripRefs = useRef<THREE.Mesh[]>([]);
  const rgbColors = useMemo(() => ["#ff3366", "#a855f7", "#3b82f6", "#22d3ee", "#10b981"], []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    stripRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.38 + Math.sin(t * 2 + i * 0.8) * 0.22;
    });
  });

  return (
    <group position={position}>
      <RoundedBox args={[0.95, 0.03, 0.34]} radius={0.012} smoothness={4}>
        <meshStandardMaterial color="#0f0f1a" roughness={0.7} metalness={0.4} />
      </RoundedBox>
      {rgbColors.flatMap((color, row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <RoundedBox
            key={`${row}-${col}`}
            ref={(el) => {
              if (el && col === 0) stripRefs.current[row] = el;
            }}
            args={[0.08, 0.012, 0.045]}
            radius={0.006}
            smoothness={3}
            position={[-0.34 + col * 0.135, 0.024, -0.1 + row * 0.05]}
          >
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} transparent opacity={0.85} />
          </RoundedBox>
        ))
      )}
    </group>
  );
}

function Mouse({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Capsule args={[0.045, 0.09, 8, 12]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" emissive="#7c3aed" emissiveIntensity={0.25} roughness={0.5} metalness={0.4} />
      </Capsule>
      <mesh position={[0, 0.022, -0.02]}>
        <boxGeometry args={[0.015, 0.01, 0.028]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function PenHolder({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder args={[0.075, 0.065, 0.16, 16]} position={[0, 0.08, 0]}>
        <meshStandardMaterial color="#22283c" roughness={0.55} metalness={0.35} />
      </Cylinder>
      {[-0.04, 0, 0.04].map((x, i) => (
        <group key={x} position={[x, 0.2, 0]} rotation={[0.25, 0, -0.18 + i * 0.18]}>
          <Cylinder args={[0.008, 0.008, 0.28, 8]}>
            <meshStandardMaterial color={i === 1 ? "#fbbf24" : "#e5e7eb"} roughness={0.5} />
          </Cylinder>
          <Cylinder args={[0.012, 0, 0.05, 8]} position={[0, 0.165, 0]}>
            <meshStandardMaterial color="#f97316" roughness={0.5} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
}

function DeskLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder args={[0.08, 0.1, 0.025, 16]}>
        <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.6} />
      </Cylinder>
      <Cylinder args={[0.012, 0.012, 0.45, 8]} position={[0, 0.24, 0]} rotation={[0, 0, 0.15]}>
        <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.6} />
      </Cylinder>
      <Cylinder args={[0.012, 0.012, 0.3, 8]} position={[0.08, 0.52, 0]} rotation={[0, 0, -0.6]}>
        <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.6} />
      </Cylinder>
      <Cylinder args={[0.025, 0.07, 0.1, 16]} position={[0.18, 0.6, 0]} rotation={[0, 0, -0.5]}>
        <meshStandardMaterial color="#26213a" emissive="#7c3aed" emissiveIntensity={0.25} roughness={0.4} metalness={0.5} />
      </Cylinder>
      <pointLight position={[0.18, 0.55, 0.05]} intensity={1.9} color="#c084fc" distance={3} decay={2} />
    </group>
  );
}

function CoffeeMug({ position }: { position: [number, number, number] }) {
  const steamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!steamRef.current) return;
    const t = state.clock.elapsedTime;
    steamRef.current.children.forEach((child, i) => {
      child.position.y = 0.18 + Math.sin(t * 1.4 + i) * 0.025 + i * 0.035;
      child.rotation.z = Math.sin(t + i) * 0.12;
    });
  });

  return (
    <group position={position}>
      <Cylinder args={[0.052, 0.046, 0.1, 16]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#1e1b4b" roughness={0.6} metalness={0.2} />
      </Cylinder>
      <Torus args={[0.03, 0.008, 8, 16, Math.PI]} position={[0.055, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <meshStandardMaterial color="#1e1b4b" roughness={0.6} metalness={0.2} />
      </Torus>
      <Cylinder args={[0.043, 0.043, 0.005, 16]} position={[0, 0.095, 0]}>
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </Cylinder>
      <group position={[-0.035, 0.07, 0.052]} scale={0.33}>
        <CodeGlyph color="#f8fafc" />
      </group>
      <group ref={steamRef}>
        {[0, 1, 2].map((i) => (
          <Torus key={i} args={[0.025, 0.004, 6, 18, Math.PI]} position={[-0.025 + i * 0.025, 0.18 + i * 0.035, 0]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#f8fafc" emissive="#c084fc" emissiveIntensity={0.3} transparent opacity={0.42} />
          </Torus>
        ))}
      </group>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  const foliageRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!foliageRef.current) return;
    const t = state.clock.elapsedTime;
    foliageRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
    foliageRef.current.rotation.x = Math.sin(t * 0.6 + 1) * 0.02;
  });

  return (
    <group position={position}>
      <Cylinder args={[0.06, 0.05, 0.1, 12]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#374151" roughness={0.8} metalness={0.1} />
      </Cylinder>
      <Cylinder args={[0.055, 0.055, 0.01, 12]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#292524" roughness={0.95} />
      </Cylinder>
      <group ref={foliageRef} position={[0, 0.15, 0]}>
        {[
          [0, 0.04, 0, 0.065, "#166534"],
          [0.04, 0.07, 0.02, 0.05, "#15803d"],
          [-0.03, 0.08, -0.02, 0.04, "#166534"],
          [0.01, 0.11, 0.01, 0.035, "#14532d"],
        ].map(([x, y, z, radius, color], i) => (
          <Sphere key={i} args={[radius as number, 8, 8]} position={[x as number, y as number, z as number]}>
            <meshStandardMaterial color={color as string} emissive="#22c55e" emissiveIntensity={0.1} roughness={0.8} />
          </Sphere>
        ))}
      </group>
    </group>
  );
}

function WallFrame() {
  return (
    <group position={[-1.45, 1.15, -0.72]} rotation={[0.08, 0.04, 0]}>
      <RoundedBox args={[0.72, 0.52, 0.035]} radius={0.035} smoothness={4}>
        <meshStandardMaterial color="#080c17" emissive="#6d28d9" emissiveIntensity={0.06} roughness={0.6} metalness={0.2} transparent opacity={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.58, 0.38, 0.02]} radius={0.025} smoothness={4} position={[0, 0, 0.026]}>
        <meshStandardMaterial color="#030712" emissive="#6d28d9" emissiveIntensity={0.08} roughness={0.5} transparent opacity={0.55} />
      </RoundedBox>
      <group position={[-0.12, 0.04, 0.042]} scale={1.18}>
        <CodeGlyph color="#c084fc" />
      </group>
    </group>
  );
}

export default function DeveloperWorkspace() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const targetRotation = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = -0.98 + Math.sin(t * 0.6) * 0.08;

    targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, state.pointer.y * 0.08, 0.04);
    targetRotation.y = THREE.MathUtils.lerp(targetRotation.y, state.pointer.x * 0.12, 0.04);
    groupRef.current.rotation.x = targetRotation.x;
    groupRef.current.rotation.y = targetRotation.y + 0.16;
  });

  const scale = viewport.width < 6 ? 0.72 : 1.08;

  return (
    <group ref={groupRef} scale={scale}>
      <AtmosphericLayer />
      <SoftReflection />
      <WallFrame />

      <RoundedBox args={[3.2, 0.06, 1.4]} radius={0.02} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#7c4a24" emissive="#2b0f35" emissiveIntensity={0.2} roughness={0.66} metalness={0.14} />
      </RoundedBox>
      {[-0.45, 0, 0.45].map((z) => (
        <mesh key={z} position={[0, 0.038, z]}>
          <boxGeometry args={[3.05, 0.005, 0.018]} />
          <meshStandardMaterial color="#a16207" emissive="#6d28d9" emissiveIntensity={0.08} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 0.032, 0.68]}>
        <boxGeometry args={[3.15, 0.008, 0.012]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.85} />
      </mesh>
      {[
        [-1.4, -0.55, 0.55],
        [1.4, -0.55, 0.55],
        [-1.4, -0.55, -0.55],
        [1.4, -0.55, -0.55],
      ].map((pos, i) => (
        <Cylinder key={i} args={[0.025, 0.025, 1.05, 8]} position={pos as [number, number, number]}>
          <meshStandardMaterial color="#111827" roughness={0.6} metalness={0.5} />
        </Cylinder>
      ))}

      <Monitor position={[-0.8, 0.52, -0.3]} rotation={[0, 0.12, 0]} screenWidth={1.3} screenHeight={0.85} codeColor="#61DAFB" />
      <Monitor position={[0.8, 0.52, -0.3]} rotation={[0, -0.12, 0]} screenWidth={1.3} screenHeight={0.85} codeColor="#c084fc" />
      <Laptop position={[0, 0.04, 0.25]} />
      <RGBKeyboard position={[-0.05, 0.045, 0.5]} />
      <Mouse position={[0.65, 0.04, 0.5]} />
      <PenHolder position={[-1.12, 0.035, 0.36]} />
      <DeskLamp position={[1.35, 0.03, -0.4]} />
      <CoffeeMug position={[1.1, 0.03, 0.4]} />
      <Plant position={[-1.35, 0.03, -0.35]} />

      {TECH_ICONS.map((icon, i) => (
        <FloatingBadge key={icon.label} icon={icon} phase={i * 1.1} />
      ))}
    </group>
  );
}

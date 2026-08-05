"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

interface TechIcon {
  label: string;
  color: string;
}

// Brand-ish colors per technology. Label is rendered as text on the tile
// face so no external image/texture loading is required (keeps this
// dependency-free and fast - no network requests at runtime).
const ICONS: TechIcon[] = [
  { label: "React", color: "#61DAFB" },
  { label: "Next.js", color: "#FFFFFF" },
  { label: "TypeScript", color: "#3178C6" },
  { label: "JavaScript", color: "#F7DF1E" },
  { label: "Python", color: "#3776AB" },
  { label: "C++", color: "#00599C" },
  { label: "Node.js", color: "#339933" },
  { label: "Express", color: "#B0B0B0" },
  { label: "MongoDB", color: "#47A248" },
  { label: "Git", color: "#F05033" },
  { label: "GitHub", color: "#E5E7EB" },
  { label: "Docker", color: "#2496ED" },
  { label: "Tailwind", color: "#38BDF8" },
  { label: "VS Code", color: "#007ACC" },
];

// Split icons across two rings for visual depth
const RING_1 = ICONS.slice(0, 7);
const RING_2 = ICONS.slice(7);

function OrbitRing({
  icons,
  radius,
  speed,
  tilt,
  yOffset,
}: {
  icons: TechIcon[];
  radius: number;
  speed: number;
  tilt: number;
  yOffset: number;
}) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={ringRef} rotation={[tilt, 0, 0]} position={[0, yOffset, 0]}>
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <IconTile
            key={icon.label}
            position={[x, 0, z]}
            color={icon.color}
            label={icon.label}
            phase={i}
          />
        );
      })}
    </group>
  );
}

function IconTile({
  position,
  color,
  label,
  phase,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  phase: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Each tile floats independently using its index as a phase offset
  // so they don't all bob in sync.
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 1.2 + phase) * 0.15;

    // Smooth hover scale (lerp toward target instead of snapping)
    const targetScale = hovered ? 1.35 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );

    // Counter-rotate the tile so it always faces outward/camera-ish
    // rather than spinning with the whole ring (keeps text readable)
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <RoundedBox args={[0.55, 0.55, 0.12]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#12162a"
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.35}
          roughness={0.4}
          metalness={0.3}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.09}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={0.5}
        textAlign="center"
      >
        {label}
      </Text>
    </group>
  );
}

/**
 * OrbitIcons.tsx
 * Two independently-rotating rings of tech icons around the avatar.
 * Ring 1: 7 icons, faster, slight upward tilt
 * Ring 2: remaining 7 icons, slower, wider radius, opposite tilt
 */
export default function OrbitIcons() {
  const rings = useMemo(
    () => [
      { icons: RING_1, radius: 2.6, speed: 0.18, tilt: 0.25, yOffset: 0.3 },
      { icons: RING_2, radius: 3.6, speed: -0.12, tilt: -0.15, yOffset: -0.1 },
    ],
    []
  );

  return (
    <group>
      {rings.map((ring, i) => (
        <OrbitRing key={i} {...ring} />
      ))}
    </group>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
  count?: number;
}

/**
 * FloatingParticles.tsx
 * Lightweight star field using a single Points object (one draw call)
 * instead of individual meshes - critical for keeping 60 FPS on mobile.
 */
export default function FloatingParticles({ count = 400 }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random star positions once (memoized so it never recalculates on re-render)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread stars in a wide box behind/around the scene
      arr[i * 3] = (Math.random() - 0.5) * 20; // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4; // z (pushed back)
    }
    return arr;
  }, [count]);

  // Very slow rotation - keeps the background alive without distracting
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a5b4fc"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

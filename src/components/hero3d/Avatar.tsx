"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Sphere, Torus, Capsule } from "@react-three/drei";
import * as THREE from "three";

/**
 * Avatar.tsx
 *
 * NOTE ON FIDELITY:
 * True Pixar/WWDC-quality character rigs (cloth-simulated hoodie, sculpted
 * face, joint-based folded arms) require an actual modeled + rigged .glb
 * file (built in Blender, or generated via Ready Player Me / Mixamo),
 * imported here with drei's `useGLTF`. Primitive geometry alone can't
 * reach that fidelity.
 *
 * This component builds a clean STYLIZED LOW-POLY avatar entirely from
 * primitives (sphere head, capsule hoodie body, capsule arms, torus
 * glasses) - a common, professional look for dev portfolios. When you
 * have a .glb ready, replace the <group> contents below with:
 *
 *   const { scene } = useGLTF('/models/avatar.glb');
 *   return <primitive object={scene} />;
 *
 * ...and keep the floating/breathing/mouse-follow logic in useFrame as-is.
 */
export default function Avatar() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Smoothed mouse target - avoids jittery instant rotation
  const targetRotation = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((state, delta) => {
    if (!groupRef.current || !headRef.current) return;

    const t = state.clock.elapsedTime;

    // --- Gentle floating (vertical bob) ---
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;

    // --- Breathing (subtle scale pulse on the whole body) ---
    const breathe = 1 + Math.sin(t * 1.6) * 0.015;
    groupRef.current.scale.set(breathe, breathe, breathe);

    // --- Mouse-follow rotation (head/shoulders turn slightly toward cursor) ---
    // state.pointer is normalized (-1 to 1), scaled down so the motion stays subtle
    targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, state.pointer.y * 0.15, 0.05);
    targetRotation.y = THREE.MathUtils.lerp(targetRotation.y, state.pointer.x * 0.25, 0.05);

    headRef.current.rotation.x = targetRotation.x;
    headRef.current.rotation.y = targetRotation.y;
    groupRef.current.rotation.y = targetRotation.y * 0.3; // whole body turns slightly too
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={viewport.width < 6 ? 0.7 : 1}>
      {/* Head + face group - this is what rotates toward the cursor */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Head */}
        <Sphere args={[0.55, 32, 32]} castShadow>
          <meshStandardMaterial color="#f2c9a0" roughness={0.6} metalness={0.05} />
        </Sphere>

        {/* Glasses - two torus lenses + bridge */}
        <group position={[0, 0.05, 0.48]}>
          <Torus args={[0.16, 0.03, 16, 32]} position={[-0.22, 0, 0]}>
            <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.6} />
          </Torus>
          <Torus args={[0.16, 0.03, 16, 32]} position={[0.22, 0, 0]}>
            <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.6} />
          </Torus>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.12, 0.02, 0.02]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
        </group>

        {/* Soft smile */}
        <mesh position={[0, -0.18, 0.5]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.09, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#7a3b2e" />
        </mesh>

        {/* Hood resting behind the head */}
        <Torus
          args={[0.62, 0.09, 16, 32, Math.PI * 1.3]}
          position={[0, -0.05, -0.15]}
          rotation={[0.3, 0, 0]}
        >
          <meshStandardMaterial color="#0f0f14" roughness={0.9} />
        </Torus>
      </group>

      {/* Hoodie body */}
      <RoundedBox args={[0.95, 1.05, 0.55]} radius={0.22} smoothness={4} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial color="#0f0f14" roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* Hoodie zipper accent */}
      <mesh position={[0, 0.25, 0.29]}>
        <boxGeometry args={[0.04, 0.7, 0.02]} />
        <meshStandardMaterial color="#6d28d9" emissive="#6d28d9" emissiveIntensity={0.6} />
      </mesh>

      {/* Folded arms - two angled capsules crossing the chest */}
      <Capsule
        args={[0.14, 0.55, 8, 16]}
        position={[-0.15, 0.05, 0.35]}
        rotation={[0, 0, Math.PI / 2.6]}
        castShadow
      >
        <meshStandardMaterial color="#0f0f14" roughness={0.85} />
      </Capsule>
      <Capsule
        args={[0.14, 0.55, 8, 16]}
        position={[0.15, -0.02, 0.35]}
        rotation={[0, 0, -Math.PI / 2.6]}
        castShadow
      >
        <meshStandardMaterial color="#0f0f14" roughness={0.85} />
      </Capsule>
    </group>
  );
}

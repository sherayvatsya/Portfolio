"use client";

/**
 * Lights.tsx
 * Centralized lighting rig for the Hero scene.
 * - AmbientLight: soft global fill so nothing is pure black
 * - HemisphereLight: sky/ground color blend for natural gradient shading
 * - DirectionalLight: key light with soft shadows (workspace + icons)
 * - Purple Rim Light: pointLight behind the scene for the neon rim glow
 * - Violet Spot Light: simulates the desk lamp cone
 */
export default function Lights() {
  return (
    <>
      {/* Soft global fill - keeps shadows from going fully black */}
      <ambientLight intensity={0.32} color="#a7b0ff" />

      {/* Sky (blue-purple) vs ground (dark navy) color blend */}
      <hemisphereLight
        args={["#6d5dff", "#0a0e17", 0.62]}
      />

      {/* Key light - casts soft shadows on workspace */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.05}
        color="#f1edff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.0005}
      />

      {/* Purple rim/back light - gives the neon silhouette edge */}
      <pointLight
        position={[-3.2, 1.8, -3]}
        intensity={7}
        color="#a855f7"
        distance={10}
        decay={2}
      />

      {/* Secondary blue accent from the front-right, low intensity */}
      <pointLight
        position={[3, -1, 2]}
        intensity={2.2}
        color="#22d3ee"
        distance={8}
        decay={2}
      />

      {/* Violet desk lamp spot - subtle fill on the workspace surface */}
      <spotLight
        position={[1.5, 2, -0.3]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.35}
        color="#c084fc"
        distance={5}
        decay={2}
        target-position={[0, 0, 0]}
      />
    </>
  );
}

# 3D Hero — Setup Guide

## 1. Install dependencies

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion
npm install -D @types/three
```

## 2. Wire it into your Hero section (lazy-loaded, no SSR)

```tsx
// components/Hero.tsx
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// ssr: false is required — three.js touches `window`/WebGL and will
// break the Next.js server render if not excluded from it.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-purple-500/40 border-t-purple-400 animate-spin" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#070B14] flex flex-col md:flex-row items-center px-6 md:px-16 overflow-hidden">
      {/* LEFT — your existing hero text, unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 z-10"
      >
        {/* ...your existing "Hi, I am Sheray Vatsya" text block goes here... */}
      </motion.div>

      {/* RIGHT — 3D avatar + orbit icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex-1 w-full h-[420px] md:h-[600px]"
      >
        <HeroCanvas />
      </motion.div>
    </section>
  );
}
```

## 3. File structure

```
components/
 ├── HeroCanvas.tsx      # Canvas, lights, bloom, mobile guards
 ├── Avatar.tsx          # Stylized primitive avatar (floating/breathing/mouse-follow)
 ├── OrbitIcons.tsx      # Two rotating rings of tech-stack tiles
 ├── FloatingParticles.tsx  # Background star field (single Points draw call)
 └── Lights.tsx          # Ambient + hemisphere + directional + purple rim light
```

## 4. Performance notes (already handled in the code)

- **DPR clamp**: `dpr={[1, 1.75]}` (1.25 on mobile) stops 4K/Retina screens rendering at full pixel density
- **Lazy Canvas**: load via `dynamic(..., { ssr: false })` — keeps three.js out of the initial JS bundle
- **Icons skipped on mobile**: `OrbitIcons` only renders on screens ≥768px to protect frame rate on weaker phone GPUs
- **Single draw call for stars**: `FloatingParticles` uses one `<points>` object instead of hundreds of meshes
- **Auto-dispose**: React Three Fiber automatically disposes geometries/materials on unmount — no manual cleanup needed unless you add textures loaded outside of R3F's cache

## 5. Upgrading the avatar later (true Pixar/WWDC quality)

The current `Avatar.tsx` is built from primitives (sphere/capsule/torus) — clean and performant,
but not the same fidelity as a modeled/rigged character. When ready:

1. Get a `.glb` model (Blender export, Ready Player Me, or a Sketchfab CC model)
2. Place it in `/public/models/avatar.glb`
3. Replace the primitive `<group>` contents in `Avatar.tsx` with:

```tsx
import { useGLTF } from "@react-three/drei";

const { scene } = useGLTF("/models/avatar.glb");
return <primitive object={scene} />;
```

Keep the existing `useFrame` floating/breathing/mouse-follow logic — it applies to any object,
primitive or imported model.

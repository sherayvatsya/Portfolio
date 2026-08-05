"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import DeveloperWorkspace from "./DeveloperWorkspace";
import FloatingParticles from "./FloatingParticles";
import Lights from "./Lights";
import { usePathname } from "next/navigation";

import React, { Component, ErrorInfo, ReactNode } from "react";

class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("WebGL Error caught by boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

function CanvasFallback() {
  return (
    <div className="w-full h-full" style={{ background: "transparent" }} />
  );
}

export default function HeroCanvas() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const particleCount = useMemo(() => (isMobile ? 180 : 400), [isMobile]);

  return (
    <div className="w-full h-full min-h-[420px]" style={{ background: "transparent" }}>
      <CanvasErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas

            key={pathname}
            shadows
            dpr={[1, isMobile ? 1.25 : 1.75]}
            camera={{ position: [0, 2.05, 5.45], fov: 38 }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: true,
            }}
            onCreated={({ gl }) => {
              const context = gl.getContext();
              if (context?.canvas) {
                context.canvas.addEventListener(
                  "webglcontextlost",
                  (e) => e.preventDefault(),
                  false
                );
              }
            }}
          >
            <fog attach="fog" args={["#030712", 8.5, 16]} />

            <Lights />
            <FloatingParticles count={particleCount} />
            <DeveloperWorkspace />

            <EffectComposer multisampling={0}>
              <Bloom
                intensity={isMobile ? 0.65 : 1.12}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
}

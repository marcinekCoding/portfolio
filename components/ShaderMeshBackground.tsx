"use client";

import { useEffect, useRef, useState } from "react";

type ShaderMeshBackgroundProps = {
  /** 0–1 — siła reakcji na kursor (Shader-style subtle drift) */
  interactive?: boolean;
  className?: string;
};

export default function ShaderMeshBackground({
  interactive = true,
  className = "",
}: ShaderMeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!interactive || reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, reducedMotion]);

  const drift = reducedMotion
    ? {}
    : {
        transform: `translate3d(${offset.x * 18}px, ${offset.y * 14}px, 0)`,
      };

  return (
    <div
      ref={containerRef}
      className={`shader-mesh ${className}`}
      aria-hidden="true"
    >
      <div className="shader-mesh__orbs" style={drift}>
        <div className="shader-orb shader-orb--violet" />
        <div className="shader-orb shader-orb--blue" />
        <div className="shader-orb shader-orb--coral" />
        <div className="shader-orb shader-orb--mint" />
      </div>
      <div className="shader-mesh__noise" />
      <div className="shader-mesh__scrim" />
    </div>
  );
}

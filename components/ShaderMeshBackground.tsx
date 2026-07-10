"use client";

import { useEffect, useRef, useState } from "react";

type ShaderMeshBackgroundProps = {
  /** Enables cursor-following parallax on orbs (hero) */
  interactive?: boolean;
  className?: string;
};

const LERP = 0.115;

const ORB_WRAPS = [
  { wrap: "shader-orb-wrap--violet", orb: "shader-orb--violet" },
  { wrap: "shader-orb-wrap--blue", orb: "shader-orb--blue" },
  { wrap: "shader-orb-wrap--coral", orb: "shader-orb--coral" },
  { wrap: "shader-orb-wrap--mint", orb: "shader-orb--mint" },
] as const;

export default function ShaderMeshBackground({
  interactive = true,
  className = "",
}: ShaderMeshBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!interactive || reducedMotion) return;

    let rafId = 0;

    const getBounds = () => {
      const section =
        containerRef.current?.closest("section") ??
        containerRef.current?.parentElement;

      if (section) {
        return section.getBoundingClientRect();
      }

      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      } as DOMRect;
    };

    const onMove = (event: PointerEvent) => {
      const rect = getBounds();
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;

      targetRef.current = {
        x: (nx - 0.5) * 2,
        y: (ny - 0.5) * 2,
      };
    };

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      const orbs = orbsRef.current;
      if (orbs) {
        orbs.style.setProperty("--pointer-x", current.x.toFixed(4));
        orbs.style.setProperty("--pointer-y", current.y.toFixed(4));
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [interactive, reducedMotion]);

  const meshClass = [
    "shader-mesh",
    interactive && !reducedMotion ? "shader-mesh--cursor" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={meshClass} aria-hidden="true">
      <div ref={orbsRef} className="shader-mesh__orbs">
        {ORB_WRAPS.map(({ wrap, orb }) => (
          <div key={wrap} className={`shader-orb-wrap ${wrap}`}>
            <div className={`shader-orb ${orb}`} />
          </div>
        ))}
      </div>
      <div className="shader-mesh__noise" />
      <div className="shader-mesh__scrim" />
    </div>
  );
}

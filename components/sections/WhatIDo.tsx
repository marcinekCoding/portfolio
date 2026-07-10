import { Clapperboard, Code2 } from "lucide-react";
import Reveal from "@/components/Reveal";

const AREAS = [
  {
    icon: Clapperboard,
    accent: "var(--color-accent-montaz)",
    title: "Montaż wideo",
    description:
      "Vlogi, shorty pod social media, filmy z eventów i filmy urodzinowe — od surowego materiału do gotowej historii.",
    href: "#montaz",
    linkLabel: "Zobacz realizacje",
  },
  {
    icon: Code2,
    accent: "var(--color-accent-dev)",
    title: "Programowanie",
    description:
      "Projekty webowe i narzędzia — Photo Cropper, Smart Home Engine, gra w wisielca i ta strona portfolio.",
    href: "#projekty",
    linkLabel: "Zobacz projekty",
  },
];

export default function WhatIDo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="label mb-4">Czym się zajmuję</p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          <span className="text-gradient">Dwie specjalizacje, jedna jakość.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {AREAS.map((area, i) => (
          <Reveal key={area.title} delay={i * 100}>
            <div className="card h-full p-8 sm:p-10">
              <area.icon
                size={28}
                strokeWidth={1.5}
                style={{ color: area.accent }}
                aria-hidden="true"
              />
              <h3 className="font-display mt-6 text-2xl sm:text-3xl">
                {area.title}
              </h3>
              <p className="mt-4 font-light leading-relaxed text-[var(--color-text-secondary)]">
                {area.description}
              </p>
              <a
                href={area.href}
                className="link-underline mt-6 inline-block text-xs uppercase tracking-[0.15em]"
              >
                {area.linkLabel}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

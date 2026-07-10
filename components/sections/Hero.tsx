import { ArrowDown } from "lucide-react";
import { SITE } from "@/lib/constants";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      <HeroBackground />

      <div className="relative z-10 flex flex-col items-center">
        <p className="hero-reveal hero-reveal-delay-1 label label-gradient mb-8">
          portfolio
        </p>
        <h1 className="hero-reveal hero-reveal-delay-2 hero-title font-pixel text-[clamp(1rem,5vw,3.5rem)]">
          {SITE.name.split(" ").map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </h1>
        <p className="hero-reveal hero-reveal-delay-2 mt-6 text-sm uppercase tracking-[0.2em] text-gradient">
          Montażysta{" "}
          <span aria-hidden="true" className="mx-2 opacity-50">
            ·
          </span>{" "}
          Programista
        </p>
        <a href="#o-mnie" className="hero-reveal hero-reveal-delay-3 btn-pill mt-14">
          Wejdź
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

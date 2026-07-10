import Image from "next/image";
import Reveal from "@/components/Reveal";

const PORTFOLIO_DRIVE_URL =
  "https://drive.google.com/drive/folders/1Lb0caRhlvL8Fg4v6z3aVop6eIGqo632R?usp=sharing";

export default function PortfolioBanner() {
  return (
    <section
      aria-label="Portfolio — wizualizacja"
      className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12"
    >
      <Reveal>
        <h2 className="font-display mb-8 text-[clamp(2rem,6vw,4rem)] leading-[1.05] sm:mb-10">
          <span className="text-gradient">Ponad 100+ zmontowanych shortsów</span>
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="portfolio-banner">
          <div
            className="portfolio-banner__glow transition-[filter] duration-300 group-hover/portfolio-link:brightness-110"
            aria-hidden="true"
          />
          <a
            href={PORTFOLIO_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Otwórz portfolio shortsów na Google Drive"
            className="group/portfolio-link block cursor-pointer rounded-[var(--radius-container)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
          >
            <div className="portfolio-banner__frame transition-transform duration-300 ease-out group-hover/portfolio-link:scale-[1.015] group-hover/portfolio-link:shadow-[0_24px_48px_rgba(0,0,0,0.5),0_0_100px_rgba(139,92,246,0.22),0_0_140px_rgba(59,130,246,0.12)]">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="/portfolio/portfolio-banner.png"
                  alt="Kolaż portfolio — montaż wideo i projekty programistyczne"
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover"
                  priority={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </a>
        </div>
      </Reveal>
      <Reveal delay={200}>
        <p className="font-display mt-8 text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.1] text-gradient sm:mt-10">
          i ponad 6 lat doświadczenia
        </p>
      </Reveal>
    </section>
  );
}

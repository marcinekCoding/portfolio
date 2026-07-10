import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";
import { assetPath } from "@/lib/assets";
import { MONTAGE_WORKS } from "@/lib/constants";

export default function MontagePortfolio() {
  return (
    <section id="montaz" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal>
          <p className="label mb-4" style={{ color: "var(--color-accent-montaz)" }}>
            Portfolio — montaż
          </p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
            <span className="text-gradient">Wybrane realizacje wideo.</span>
          </h2>
        </Reveal>
      </div>

      <div className="montage-carousel-wrap relative mt-12">
        <div
          className="montage-carousel"
          tabIndex={0}
          role="region"
          aria-label="Wybrane realizacje wideo — przewiń w poziomie"
        >
          <div className="montage-carousel__track">
            {MONTAGE_WORKS.map((work, i) => (
              <Reveal key={work.id} delay={i * 80} className="montage-carousel__item">
                <article className="card group flex h-full flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface)]">
                    <Image
                      src={assetPath(work.image)}
                      alt={work.imageAlt}
                      fill
                      sizes="340px"
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                        work.vertical ? "object-contain" : "object-cover"
                      }`}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <p
                      className="label mb-2"
                      style={{ color: "var(--color-accent-montaz)" }}
                    >
                      {work.category}
                    </p>
                    <h3 className="font-display text-2xl">{work.title}</h3>
                    <p className="mt-3 flex-1 font-light leading-relaxed text-[var(--color-text-secondary)]">
                      {work.description}
                    </p>
                    {work.href && (
                      <div className="mt-6 flex flex-wrap gap-5">
                        <a
                          href={work.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em]"
                        >
                          {work.linkLabel ?? "Obejrzyj"}
                          <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="montage-carousel__fade montage-carousel__fade--left" aria-hidden="true" />
        <div className="montage-carousel__fade montage-carousel__fade--right" aria-hidden="true" />
        <p className="montage-carousel__hint" aria-hidden="true">
          Przewiń →
        </p>
      </div>
    </section>
  );
}

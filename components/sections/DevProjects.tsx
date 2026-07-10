import Image from "next/image";
import { ExternalLink, FolderCode, Github } from "lucide-react";
import Reveal from "@/components/Reveal";
import { DEV_PROJECTS } from "@/lib/constants";

export default function DevProjects() {
  return (
    <section id="projekty" className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="label mb-4" style={{ color: "var(--color-accent-dev)" }}>
          Portfolio — development
        </p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          <span className="text-gradient">Projekty programistyczne.</span>
        </h2>
        <p className="mt-6 max-w-[65ch] font-light leading-relaxed text-[var(--color-text-secondary)]">
          Narzędzia i aplikacje, które zbudowałem — od webowych po konsolowe.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {DEV_PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            {project.isPlaceholder ? (
              /* TODO: uzupełnij dane projektu w lib/constants.ts (DEV_PROJECTS). */
              <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-[32px] border border-dashed border-[var(--color-border-strong)] p-8 text-center">
                <FolderCode
                  size={28}
                  strokeWidth={1.5}
                  className="text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <p className="font-display mt-5 text-xl text-[var(--color-text-secondary)]">
                  Miejsce na projekt
                </p>
                <p className="mt-2 text-sm font-light text-[var(--color-text-muted)]">
                  Uzupełnij dane w{" "}
                  <span className="font-mono-tag">lib/constants.ts</span>
                </p>
              </div>
            ) : (
              <article className="card group flex h-full flex-col">
                {project.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface)]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-2xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 flex-1 font-light leading-relaxed text-[var(--color-text-secondary)]">
                    {project.description}
                  </p>
                  {!project.image && project.tech.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <li key={tech} className="tag">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-6 flex flex-wrap gap-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em]"
                      >
                        Live demo
                        <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em]"
                      >
                        GitHub
                        <Github size={14} strokeWidth={1.5} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

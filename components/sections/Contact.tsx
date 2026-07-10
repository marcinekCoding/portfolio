import { Github, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { CONTACT_EMAIL, SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function Contact() {
  const githubLink = SOCIAL_LINKS.find((link) => link.label === "GitHub" && link.href);
  const activeSocials = SOCIAL_LINKS.filter(
    (link) => link.href && link.label !== "GitHub",
  );

  return (
    <footer id="kontakt" className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="label mb-4">Kontakt</p>
          <h2 className="font-display text-[clamp(1.75rem,5vw,4rem)] leading-tight">
            <span className="text-gradient">Porozmawiajmy o projekcie.</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 max-w-xl">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn-pill">
              <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill"
              >
                <Github size={16} strokeWidth={1.5} aria-hidden="true" />
                github.com/{githubLink.href.replace(/https?:\/\/github\.com\//i, "")}
              </a>
            )}
          </div>

          {activeSocials.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-6">
              {activeSocials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)] hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <div className="mt-20 flex flex-col gap-2 border-t border-[var(--color-border)] pt-8 text-xs text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="uppercase tracking-[0.15em]">Montaż wideo · Development</p>
        </div>
      </div>
    </footer>
  );
}

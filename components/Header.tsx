const NAV_LINKS = [
  { href: "#o-mnie", label: "O mnie" },
  { href: "#montaz", label: "Montaż" },
  { href: "#projekty", label: "Projekty" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg tracking-wide text-gradient"
          aria-label="Marcin Pawlak — początek strony"
        >
          MP
        </a>
        <nav aria-label="Nawigacja główna">
          <ul className="flex items-center gap-5 sm:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

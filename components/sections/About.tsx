import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="o-mnie" className="mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="label mb-4">O mnie</p>
        <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          <span className="text-gradient">
            Montaż i kod — dwie strony tej samej historii.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8 max-w-[65ch] space-y-4 text-lg font-light leading-relaxed text-[var(--color-text-secondary)]">
          <p>
            Zajmuję się montażem wideo — od vlogów podróżniczych i krótkich form
            pod social media po filmy okolicznościowe i urodzinowe. Równolegle
            programuję i buduję projekty webowe.
          </p>
          <p>
            Jestem studentem informatyki na Politechnice Warszawskiej. Montażem
            wideo zajmuję się od sześciu lat, programowaniem — od dwóch. W
            pracy stawiam na dokładność i terminowość.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

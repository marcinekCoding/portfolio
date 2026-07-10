/**
 * ============================================================
 *  JEDNO MIEJSCE NA WSZYSTKIE DANE DO UZUPEŁNIENIA.
 *  Wyszukaj "TODO" w tym pliku i podmień wartości.
 * ============================================================
 */

export const SITE = {
  name: "Marcin Pawlak",
  role: "Montażysta & Programista",
  title: "Marcin Pawlak — Montaż wideo & Development",
  description:
    "Portfolio Marcina Pawlaka — montaż wideo (vlogi, shorty, filmy okolicznościowe) i projekty programistyczne.",
};

export const CONTACT_EMAIL = "marcinpawlaki43@gmail.com";

/**
 * TODO: Uzupełnij prawdziwe linki do profili.
 * Linki z pustym `href` nie będą renderowane na stronie,
 * więc nic zmyślonego nie trafi do produkcji.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/marcinekCoding" },
  { label: "LinkedIn", href: "" }, // TODO: np. "https://www.linkedin.com/in/twoj-profil"
  { label: "YouTube", href: "" }, // TODO: opcjonalnie — kanał z materiałami wideo
];

/** Prawdziwe prace montażowe — obrazy z folderu public/portfolio. */
export type MontageWork = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Pusty link = karta bez odnośnika (sam podgląd). */
  href: string;
  linkLabel?: string;
  vertical?: boolean;
};

export const MONTAGE_WORKS: MontageWork[] = [
  {
    id: "vlogi",
    category: "Vlogi",
    title: "Filmy z podróży",
    description:
      "Montuję vlogi pełne uczuć, przeżyć i niezapomnianych chwil.",
    image: "/portfolio/vlogi.png",
    imageAlt: "Kadr z vloga z Turcji — palmy na tle błękitnego nieba i napis Turkey Vlog",
    href: "", // TODO: link do pełnego vloga (YouTube/Drive), jeśli chcesz go podlinkować
  },
  {
    id: "shortsy",
    category: "Shorty",
    title: "Shortsy",
    description:
      "Duże doświadczenie w montowaniu filmów typowo pod YouTube Shorts i TikToka.",
    image: "/portfolio/czajnik.jpg",
    imageAlt: "Kadr z pionowego shorta — czajnik z napisem „Czy to jest czajnik?”",
    href: "https://drive.google.com/file/d/1CnZsq-pf96xNUEZ7JlR_hnYy4QdokAB5/view?usp=sharing",
    linkLabel: "Obejrzyj na Google Drive",
    vertical: true,
  },
  {
    id: "eventy",
    category: "Filmy okolicznościowe",
    title: "Filmy z eventu",
    description:
      "Relacja filmowa z imprezy okolicznościowej — klimat i energia wydarzenia.",
    image: "/portfolio/fimy_okolicznosciowe.png",
    imageAlt: "Kadr z filmu eventowego — bawiący się tłum i wystrzał z armatki CO2",
    href: "", // TODO: link do filmu, jeśli chcesz go podlinkować
  },
  {
    id: "urodziny",
    category: "Filmy urodzinowe",
    title: "18 urodziny",
    description:
      "Film urodzinowy z czołówką w stylu kinowego intro.",
    image: "/portfolio/filmyUrodzinowe.png",
    imageAlt: "Kadr czołówki filmu urodzinowego — złoty napis 18 urodziny Patryka w stylu kinowym",
    href: "", // TODO: link do filmu, jeśli chcesz go podlinkować
  },
  {
    id: "lifestyle",
    category: "Filmy lifestyle",
    title: "Lifestyle",
    description:
      "Filmy lifestyle często na platformie YouTube.",
    image: "/portfolio/lifestyle.png",
    imageAlt: "Kadr z filmu lifestyle — podgląd realizacji na YouTube",
    href: "", // TODO: link do filmu, jeśli chcesz go podlinkować
  },
];

/**
 * TODO: Uzupełnij 3 projekty programistyczne.
 * Karta z `isPlaceholder: true` wyświetla się jako czytelne
 * "miejsce na projekt". Po uzupełnieniu danych ustaw
 * `isPlaceholder: false`, a karta zamieni się w normalną prezentację.
 */
export type DevProject = {
  id: string;
  isPlaceholder: boolean;
  name: string; // TODO: nazwa projektu
  description: string; // TODO: 1–2 zdania — co robi i jaki problem rozwiązuje
  tech: string[]; // TODO: np. ["React", "TypeScript"]
  /** Opcjonalny podgląd — zamiast tagów technologii na karcie. */
  image?: string;
  imageAlt?: string;
  liveUrl: string; // TODO: link do wersji live (może zostać pusty)
  githubUrl: string; // TODO: link do repozytorium
};

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "photo-cropper",
    isPlaceholder: false,
    name: "Photo Cropper",
    description: "Narzędzie do masowego przycinania zdjęć",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "MediaPipe Face Detection",
      "HTML Canvas",
    ],
    image: "/projects/photoCropper.png",
    imageAlt: "Photo Cropper — podgląd narzędzia",
    liveUrl: "https://marcinekcoding.github.io/photoCropper-tool/",
    githubUrl: "https://github.com/marcinekCoding/photoCropper-tool",
  },
  {
    id: "smart-home-engine",
    isPlaceholder: false,
    name: "Smart Home Engine",
    description: "Serwer do obsługi smart home",
    tech: ["C++", "REST API", "httplib"],
    image: "/projects/smartHome.png",
    imageAlt: "Smart Home Engine — panel Essence Home",
    liveUrl: "",
    githubUrl: "https://github.com/marcinekCoding/SMART_HOME",
  },
  {
    id: "hangman-game",
    isPlaceholder: false,
    name: "Hangman Game",
    description: "Gra konsolowa w wisielca",
    tech: ["C#", ".NET"],
    image: "/projects/wisielec.png",
    imageAlt: "Hangman Game — ekran powitalny gry w wisielca",
    liveUrl: "",
    githubUrl: "https://github.com/marcinekCoding/Csharp_hangman_game",
  },
];

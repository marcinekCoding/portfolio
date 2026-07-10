import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhatIDo from "@/components/sections/WhatIDo";
import MontagePortfolio from "@/components/sections/MontagePortfolio";
import PortfolioBanner from "@/components/sections/PortfolioBanner";
import DevProjects from "@/components/sections/DevProjects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhatIDo />
        <MontagePortfolio />
        <PortfolioBanner />
        <DevProjects />
      </main>
      <Contact />
    </>
  );
}

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { heroBadges } from "@/data/portfolio";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <div className="grid-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <Marquee items={heroBadges} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

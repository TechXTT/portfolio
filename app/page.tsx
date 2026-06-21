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
import { StatusStrip } from "@/components/StatusStrip";
import { heroBadges } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <div
        className="grid-backdrop pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <StatusStrip />
        <Navbar />

        <main>
          <Hero />
          <Marquee items={heroBadges} />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

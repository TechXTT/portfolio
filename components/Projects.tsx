import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="03"
          kicker="Projects"
          title="Projects presented as systems, not thumbnails."
          description="Each entry names the runtime surface, what it exposes, and what actually shipped."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 70}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

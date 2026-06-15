import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/portfolio";

export function Projects() {
  return (
    <section id="projects" className="container-shell scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        index="02"
        eyebrow="Service Registry"
        title="Projects presented as systems, not thumbnails."
        description="Each entry names the runtime surface, what it exposes, and what actually shipped."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={(index % 3) * 70}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

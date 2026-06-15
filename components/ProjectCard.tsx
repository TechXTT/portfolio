import { ArrowUpRight, Github } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const links = project.links ?? (project.href ? [{ label: "Repository", href: project.href }] : []);

  return (
    <article className="nb nb-hover nb-hover-accent group flex h-full min-h-[450px] flex-col">
      {/* header */}
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-3 text-paper">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-xs font-bold text-paper/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="truncate font-mono text-sm font-bold">{project.service}</p>
        </div>
        {project.featured ? (
          <span className="shrink-0 bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-paper">
            featured
          </span>
        ) : (
          <span className="pulse-dot size-2 rounded-full bg-accent" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-3xl font-extrabold tracking-tightest">{project.title}</h3>
        <p className="mt-2 text-sm font-bold leading-6 text-accent">{project.subtitle}</p>

        <p className="mt-4 text-sm leading-7 text-inksoft">{project.description}</p>

        <div className="mt-6 grid gap-3">
          <ManifestList label="exposes" items={project.interfaces} />
          <ManifestList label="ships" items={project.ships} />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 border-t-2 border-dashed border-ink/30 pt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-inksoft"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.04em] text-ink transition hover:bg-accent hover:text-paper hover:border-accent"
              aria-label={`Open ${project.title} ${link.label}`}
            >
              {link.label}
              {link.label.toLowerCase().includes("repo") ? (
                <Github size={13} aria-hidden="true" />
              ) : (
                <ArrowUpRight size={13} aria-hidden="true" />
              )}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function ManifestList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="tag bg-paper">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

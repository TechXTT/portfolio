import { ArrowUpRight, Github, Star } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";
import { relativeDate } from "@/lib/format";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const links = project.links ?? (project.href ? [{ label: "Repository", href: project.href }] : []);
  const live = project.live;
  const updated = relativeDate(live?.lastPushed);
  const hasLiveMeta =
    live && (typeof live.stars === "number" || Boolean(live.language) || Boolean(updated));

  return (
    <article
      className={`flex h-full min-h-[460px] flex-col overflow-hidden rounded-card bg-surface ${
        project.featured ? "border border-accent" : "border border-line"
      }`}
    >
      {/* header bar */}
      <div className="panel-header justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="mono-label text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate font-mono text-xs font-bold uppercase tracking-[0.06em] text-muted">
            {project.service}
          </span>
        </div>
        {project.featured && project.badge ? (
          <span className="mono-label shrink-0 rounded-chip border border-accent px-2 py-1 text-[10px] font-bold text-accent">
            {project.badge}
          </span>
        ) : (
          <span className="status-dot shrink-0 bg-accent" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.6875rem] font-extrabold leading-tight tracking-tightest text-text">
          {project.title}
        </h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-accent">
          {project.subtitle}
        </p>

        <p className="mt-4 text-sm leading-[1.65] text-muted">{project.description}</p>

        <div className="mt-6 grid gap-3">
          <ManifestList label="exposes" items={project.interfaces} />
          <ManifestList label="ships" items={project.ships} />
        </div>

        <p className="mono-label mt-6 leading-[1.6] text-faint">
          {project.tags.join(" · ")}
        </p>

        {hasLiveMeta ? (
          <p className="mono-label mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-faint">
            {typeof live!.stars === "number" ? (
              <span className="inline-flex items-center gap-1">
                <Star size={11} aria-hidden="true" />
                {live!.stars}
              </span>
            ) : null}
            {live!.language ? <span>{live!.language}</span> : null}
            {updated ? <span>updated {updated}</span> : null}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 rounded-chip border border-linestrong px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.04em] text-muted transition hover:border-accent hover:text-accent"
              aria-label={`Open ${project.title} ${link.label}`}
            >
              {link.label}
              {link.label.toLowerCase().includes("repo") ? (
                <Github size={12} aria-hidden="true" />
              ) : (
                <ArrowUpRight size={12} aria-hidden="true" />
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
    <div className="grid grid-cols-[64px_1fr] gap-3">
      <p className="mono-label pt-1.5 font-bold text-text">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

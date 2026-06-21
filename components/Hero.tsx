import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SystemMap } from "@/components/SystemMap";
import {
  profile,
  socialLinks,
  stats as authoredStats,
  systemSignals,
  type Stat,
} from "@/data/portfolio";
import { relativeDate } from "@/lib/format";

type HeroProps = {
  /** Hero stats — authored fallback by default; live values when provided. */
  stats?: Stat[];
  /** ISO timestamp of the last GitHub sync, if any. */
  lastUpdated?: string | null;
};

export function Hero({ stats = authoredStats, lastUpdated = null }: HeroProps) {
  const synced = relativeDate(lastUpdated);

  return (
    <section id="home" className="container-shell scroll-mt-24 pb-20 pt-14 sm:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        {/* left column */}
        <div className="min-w-0">
          <Reveal>
            <p className="mono-label font-bold text-accent">
              Software Engineer · Backend &amp; Developer Tools
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,4.6rem)] font-extrabold leading-[0.95] tracking-tightest text-text">
              Backend systems that leave a{" "}
              <span className="text-accent">clean interface</span> behind.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
              I&apos;m{" "}
              <span className="font-semibold text-text">Martin Bozhilov</span> — I
              build Go services, schema-driven tools, marketplace backends, and
              product workflows where the database, API, workers, and deployment
              path are one system.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="btn btn-accent focus-ring group">
                Explore the work
                <ArrowDownRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="btn btn-outline focus-ring"
              >
                Start a conversation
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="focus-ring inline-flex items-center gap-2 rounded-chip border border-linestrong px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-muted transition hover:border-accent hover:text-accent"
                  aria-label={`Open ${label}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* right column: system map + signals */}
        <Reveal delay={140} className="min-w-0">
          <SystemMap />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {systemSignals.map((item) => (
              <div key={item.label} className="panel p-4">
                <p className="mono-label text-faint">{item.label}</p>
                <p className="mt-2 text-[15px] font-extrabold tracking-tight text-text">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* stats strip */}
      <Reveal delay={120}>
        <div className="mt-16 grid grid-cols-2 overflow-hidden rounded-card border border-line sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-surface px-5 py-7 ${
                i < 2 ? "border-b border-line sm:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r border-line" : ""} ${
                i < 3 ? "sm:border-r sm:border-line" : ""
              }`}
            >
              <p className="text-[2.125rem] font-extrabold leading-none tracking-tightest text-text">
                {stat.value}
              </p>
              <p className="mono-label mt-3 leading-[1.5] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        {synced ? (
          <p className="mono-label mt-3 flex items-center gap-2 text-faint">
            <span className="status-dot size-1.5" aria-hidden="true" />
            Synced from GitHub · {synced}
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}

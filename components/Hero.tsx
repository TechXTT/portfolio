import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Terminal } from "@/components/Terminal";
import { profile, socialLinks, stats, systemSignals } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="container-shell scroll-mt-24 pb-14 pt-8 sm:pt-12">
      {/* meta row */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3 border-y-2 border-ink py-3 font-mono text-xs font-bold uppercase tracking-[0.1em]">
          <span className="flex items-center gap-2">
            <span className="pulse-dot inline-block size-2 rounded-full bg-accent" />
            Available for work
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            <MapPin size={13} aria-hidden="true" />
            {profile.location}
          </span>
          <span className="hidden lg:inline">Backend Engineer · Go / APIs</span>
        </div>
      </Reveal>

      <div className="grid items-start gap-10 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div className="min-w-0">
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.9rem,7.5vw,6.2rem)] font-extrabold leading-[0.9] tracking-tightest">
              Backend systems
              <br />
              that leave a{" "}
              <span className="mark">clean</span> <span className="underline-accent">interface</span>
              <br />
              behind.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-xl text-lg leading-8 text-inksoft">
              I&apos;m <span className="font-bold text-ink">Martin Bozhilov</span> — I build Go
              services, schema-driven tools, marketplace backends, and product workflows where the
              database, API, workers, and deployment path are one system.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="focus-ring nb-shadow group inline-flex items-center justify-center gap-2 border-2 border-ink bg-accent px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.04em] text-paper transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Explore the work
                <ArrowDownRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring nb-shadow inline-flex items-center justify-center gap-2 border-2 border-ink bg-paper2 px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.04em] text-ink transition hover:bg-ink hover:text-paper"
              >
                <Mail size={17} aria-hidden="true" />
                Start a conversation
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex items-center gap-4">
              <div className="relative size-12 overflow-hidden border-2 border-ink">
                <Image
                  src="/martin-github-avatar.jpg"
                  alt="Martin Bozhilov"
                  fill
                  priority
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="focus-ring inline-grid size-10 place-items-center border-2 border-ink bg-paper2 text-ink transition hover:bg-accent hover:text-paper"
                    aria-label={`Open ${label}`}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: terminal + signals */}
        <Reveal delay={180} className="min-w-0">
          <Terminal />

          <div className="mt-4 grid grid-cols-2 gap-3">
            {systemSignals.map((item) => (
              <div key={item.label} className="nb p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-inksoft">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-bold text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* stats strip */}
      <Reveal delay={120}>
        <div className="mt-14 grid grid-cols-2 border-2 border-ink sm:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group bg-paper2 px-5 py-7 transition-colors hover:bg-ink hover:text-paper ${
                i < 2 ? "border-b-2 sm:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r-2" : ""} ${
                i === 0 || i === 1 || i === 2 ? "sm:border-r-2" : ""
              } border-ink`}
            >
              <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
              <p className="mt-2 font-mono text-xs leading-5 text-inksoft group-hover:text-paper/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

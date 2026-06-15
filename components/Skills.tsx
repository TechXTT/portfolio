import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="invert scroll-mt-24 border-y-2 border-ink py-20 sm:py-28">
      <div className="container-shell">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="Backend-first technical stack."
          description="Centered on Go services, PostgreSQL, developer tooling, and cloud deployment workflows."
          invert
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ title, items, icon: Icon }, index) => (
            <Reveal key={title} delay={(index % 3) * 60}>
              <article className="nb-hover group h-full border-2 border-paper bg-ink p-6 transition-colors hover:bg-paper hover:text-ink">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center border-2 border-paper text-accent group-hover:border-ink">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tightest">{title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="border-[1.5px] border-current px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.04em]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

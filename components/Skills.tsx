import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/portfolio";

export function Skills() {
  return (
    <section id="skills" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="05"
          kicker="Stack"
          title="Backend-first technical stack."
          description="Centered on Go services, PostgreSQL, developer tooling, and cloud deployment workflows."
        />

        <div className="gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {skillGroups.map(({ title, items }, index) => (
            <Reveal key={title} delay={(index % 3) * 60}>
              <article className="panel p-5">
                <div className="flex items-center gap-3">
                  <span className="diamond" aria-hidden="true" />
                  <h3 className="text-lg font-extrabold tracking-tightest text-text">
                    {title}
                  </h3>
                  <span className="mono-label ml-auto text-faint">
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="chip">
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

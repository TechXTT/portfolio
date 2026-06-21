import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="06"
          kicker="Education"
          title="Formal studies and language certification."
          description="Current ICT studies, software programming education, and verified English proficiency."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {education.map(({ institution, program, period, category, location, details }, index) => (
            <Reveal key={institution} delay={index * 70}>
              <article className="panel flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-label rounded-chip border border-line px-2 py-1 text-accent">
                    {category}
                  </span>
                  <span className="mono-label text-faint">{period}</span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold leading-tight tracking-tight text-text">
                  {institution}
                </h3>
                <p className="mt-2 text-sm font-semibold text-accent">{program}</p>

                {details.length ? (
                  <ul className="mt-5 space-y-2 text-sm leading-[1.55] text-muted">
                    {details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span
                          className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className="mono-label mt-auto pt-6 text-faint">{location}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

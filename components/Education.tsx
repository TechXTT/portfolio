import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="container-shell scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        index="05"
        eyebrow="Education"
        title="Formal studies and language certification."
        description="Current ICT studies, software programming education, and verified English proficiency."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {education.map(({ institution, program, period, details, icon: Icon }, index) => (
          <Reveal key={institution} delay={index * 70}>
            <article className="nb nb-hover nb-hover-accent group flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center border-2 border-ink text-accent group-hover:border-accent">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="tag bg-paper">{period}</span>
              </div>
              <h3 className="mt-6 text-lg font-extrabold leading-tight tracking-tight">
                {institution}
              </h3>
              <p className="mt-2 text-sm font-bold text-accent">{program}</p>
              {details.length ? (
                <ul className="mt-5 space-y-2 text-sm leading-6 text-inksoft">
                  {details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2.5 h-[2px] w-3 shrink-0 bg-accent" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

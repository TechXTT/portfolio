import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutParagraphs, operatingPrinciples } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="container-shell scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        index="01"
        eyebrow="Operator Notes"
        title="The work is backend, but the output is an interface people can trust."
        description="The through-line is not a specific framework. It's clean contracts, explicit data flows, and tools that remove backend friction."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_440px]">
        <Reveal className="nb nb-shadow p-7 sm:p-9">
          <span className="font-mono text-6xl font-bold leading-none text-accent">&ldquo;</span>
          <div className="mt-2 space-y-5 text-base leading-8 text-inksoft sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-3">
          {operatingPrinciples.map((principle, index) => (
            <Reveal key={principle.label} delay={index * 60}>
              <div className="nb nb-hover nb-hover-accent group p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
                    {principle.label}
                  </p>
                  <span className="grid size-6 place-items-center border-2 border-ink font-mono text-[11px] font-bold group-hover:border-accent group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-inksoft">{principle.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

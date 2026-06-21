import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutParagraphs, operatingPrinciples } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="02"
          kicker="About"
          title="The work is backend. The interface it leaves behind is the point."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12">
          <Reveal className="space-y-5 text-base leading-[1.7] text-muted sm:text-[1.0625rem]">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <div className="panel overflow-hidden">
              <div className="panel-header justify-between">
                <span className="mono-label text-faint">Operating Principles</span>
                <span className="diamond" aria-hidden="true" />
              </div>
              <ul>
                {operatingPrinciples.map((principle, index) => (
                  <li
                    key={principle.label}
                    className="flex gap-4 px-5 py-4 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-line"
                  >
                    <span className="mono-label shrink-0 pt-0.5 font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="mono-label font-bold text-text">{principle.label}</p>
                      <p className="mt-2 text-sm leading-[1.6] text-muted">
                        {principle.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

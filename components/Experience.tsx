import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TimelineItem } from "@/components/TimelineItem";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="04"
          kicker="Experience"
          title="A log of product and backend work."
          description="Open-source tools, current software engineering work, internships, and product teams."
        />

        <Reveal>
          <div className="panel overflow-hidden">
            <div className="panel-header justify-between">
              <span className="mono-label text-faint">work.log</span>
              <span className="mono-label text-faint">{experience.length} entries</span>
            </div>
            <ol>
              {experience.map((item, index) => (
                <TimelineItem
                  key={`${item.company}-${item.period}`}
                  item={item}
                  isLast={index === experience.length - 1}
                />
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

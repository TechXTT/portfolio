import { SectionHeading } from "@/components/SectionHeading";
import { TimelineItem } from "@/components/TimelineItem";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="container-shell scroll-mt-24 py-20 sm:py-28">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Chronology of product and backend work."
        description="Open-source tools, current software engineering work, internships, and product teams."
      />

      <ol className="relative ml-[7px] border-l-2 border-ink sm:ml-3">
        {experience.map((item, index) => (
          <TimelineItem
            key={`${item.company}-${item.period}`}
            item={item}
            index={index}
          />
        ))}
      </ol>
    </section>
  );
}

import { Reveal } from "@/components/Reveal";

type TimelineItemProps = {
  item: {
    company: string;
    role: string;
    period: string;
    points: string[];
  };
  index: number;
};

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <li className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
      {/* node */}
      <span
        className="absolute -left-[10px] top-2 size-[18px] border-2 border-ink bg-accent"
        aria-hidden="true"
      />

      <Reveal delay={index * 50}>
        <div className="nb nb-hover p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-2xl font-extrabold tracking-tightest">{item.company}</h3>
            <span className="tag w-fit bg-paper">{item.period}</span>
          </div>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.04em] text-accent">
            {item.role}
          </p>

          <ul className="mt-4 grid gap-2.5 text-sm leading-7 text-inksoft">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-3 h-[2px] w-3.5 shrink-0 bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </li>
  );
}

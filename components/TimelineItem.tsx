import type { ExperienceItem } from "@/data/portfolio";

type TimelineItemProps = {
  item: ExperienceItem;
  isLast: boolean;
};

export function TimelineItem({ item, isLast }: TimelineItemProps) {
  return (
    <li
      className={`grid gap-4 px-5 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-7 ${
        isLast ? "" : "border-b border-line"
      }`}
    >
      {/* period */}
      <div className="flex items-center gap-2">
        {item.current ? (
          <span className="status-dot pulse-dot size-2 bg-accent" aria-hidden="true" />
        ) : (
          <span className="size-2 rounded-full bg-line" aria-hidden="true" />
        )}
        <span className="mono-label text-faint">{item.periodLabel}</span>
      </div>

      {/* content */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-extrabold tracking-tightest text-text">
            {item.company}
          </h3>
          <span className="mono-label rounded-chip border border-line px-2 py-1 text-[10px] text-muted">
            {item.type}
          </span>
        </div>
        <p className="mono-label mt-2 font-bold text-accent">{item.role}</p>

        <ul className="mt-4 grid gap-2.5 text-sm leading-[1.6] text-muted">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

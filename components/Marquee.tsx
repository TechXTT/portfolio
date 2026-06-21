type MarqueeProps = {
  items: string[];
};

/**
 * Mono tech badges scrolling across a surface strip, separated by accent diamonds.
 */
export function Marquee({ items }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className="hairline-t hairline-b overflow-hidden bg-surface py-3.5">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted"
          >
            {item}
            <span className="diamond" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

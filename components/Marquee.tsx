type MarqueeProps = {
  items: string[];
};

/**
 * Bold accent marquee band of tech tags.
 */
export function Marquee({ items }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y-2 border-ink bg-accent py-3.5 text-paper">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-sm font-bold uppercase tracking-[0.12em]"
          >
            {item}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

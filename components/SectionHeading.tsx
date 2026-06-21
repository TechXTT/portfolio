import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  /** Section index, e.g. "02" → rendered as "/02" in accent. */
  index: string;
  /** Short uppercase mono kicker. */
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, kicker, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3">
        <span className="mono-label font-bold text-accent">/{index}</span>
        <span className="h-px w-[22px] bg-line" aria-hidden="true" />
        <span className="mono-label text-faint">{kicker}</span>
      </div>
      <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold leading-[1.02] tracking-tightest text-text">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-[1.0625rem]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, description, index, invert }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-end justify-between gap-4 border-b-2 border-current pb-3">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </span>
        {index ? (
          <span
            className={`font-mono text-sm font-bold ${invert ? "text-paper/40" : "text-inksoft"}`}
          >
            [ {index} / 06 ]
          </span>
        ) : null}
      </div>
      <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-tightest sm:text-[3.2rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg ${
            invert ? "text-paper/70" : "text-inksoft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

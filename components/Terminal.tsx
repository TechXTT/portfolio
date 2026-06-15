"use client";

import { useEffect, useRef, useState } from "react";

type Line =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string }
  | { type: "ok"; text: string };

const SCRIPT: Line[] = [
  { type: "cmd", text: "go run ./cmd/registry --boot" },
  { type: "out", text: "→ loading services from techxtt/*" },
  { type: "ok", text: "✓ torm     schema → generated Go client" },
  { type: "ok", text: "✓ xolto    app + workers online" },
  { type: "ok", text: "✓ bazaar   escrow contracts synced" },
  { type: "out", text: "→ 6 repos · 0 errors · build clean" },
  { type: "cmd", text: "whoami" },
  { type: "out", text: "martin bozhilov — backend engineer" },
];

const COLORS: Record<Line["type"], string> = {
  cmd: "text-paper",
  out: "text-paper/55",
  ok: "text-[#7CF59A]",
};

export function Terminal() {
  const [rendered, setRendered] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRendered(SCRIPT);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = SCRIPT[lineIdx.current];
      if (!current) {
        timer = setTimeout(() => {
          setRendered([]);
          setTyping("");
          lineIdx.current = 0;
          charIdx.current = 0;
          tick();
        }, 4200);
        return;
      }

      if (charIdx.current <= current.text.length) {
        setTyping(current.text.slice(0, charIdx.current));
        charIdx.current += 1;
        timer = setTimeout(tick, current.type === "cmd" ? 38 : 12);
      } else {
        setRendered((prev) => [...prev, current]);
        setTyping("");
        lineIdx.current += 1;
        charIdx.current = 0;
        timer = setTimeout(tick, current.type === "cmd" ? 320 : 140);
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [rendered, typing]);

  const activeLine = SCRIPT[lineIdx.current];

  return (
    <div className="nb-shadow-accent border-2 border-ink bg-ink">
      <div className="flex items-center gap-2 border-b-2 border-paper/20 px-4 py-2.5">
        <span className="size-3 rounded-full border border-paper/40 bg-accent" />
        <span className="size-3 rounded-full border border-paper/40" />
        <span className="size-3 rounded-full border border-paper/40" />
        <span className="ml-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-paper/60">
          registry.sh
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#7CF59A]">
          <span className="pulse-dot size-1.5 rounded-full bg-[#7CF59A]" />
          LIVE
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[300px] overflow-hidden p-4 font-mono text-[13px] leading-7"
      >
        {rendered.map((line, i) => (
          <Row key={i} line={line} />
        ))}
        {activeLine && lineIdx.current < SCRIPT.length ? (
          <div className={COLORS[activeLine.type]}>
            {activeLine.type === "cmd" ? <Prompt /> : null}
            <span>{typing}</span>
            <span className="cursor-blink text-accent">▋</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Prompt() {
  return (
    <span aria-hidden="true">
      <span className="text-accent">~</span>
      <span className="text-[#7CF59A]"> $ </span>
    </span>
  );
}

function Row({ line }: { line: Line }) {
  return (
    <div className={COLORS[line.type]}>
      {line.type === "cmd" ? <Prompt /> : null}
      <span>{line.text}</span>
    </div>
  );
}

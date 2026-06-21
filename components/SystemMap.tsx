import { systemMap } from "@/data/portfolio";

function NodeChip({
  label,
  variant,
}: {
  label: string;
  variant: "primary" | "node" | "branch";
}) {
  const styles =
    variant === "primary"
      ? "border-accent text-accent"
      : variant === "branch"
        ? "border-line text-faint"
        : "border-line text-muted";

  return (
    <span
      className={`block rounded-chip border bg-surface2 px-3 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.08em] leading-snug ${styles}`}
    >
      {label}
    </span>
  );
}

export function SystemMap() {
  const { file, nodes, branches } = systemMap;

  return (
    <div className="panel overflow-hidden">
      {/* header bar */}
      <div className="panel-header">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="mono-label ml-1 text-faint">{file}</span>
        <span className="mono-label ml-auto flex items-center gap-1.5 rounded-chip border border-line px-2 py-1 text-[10px] text-status">
          <span className="status-dot pulse-dot size-1.5" aria-hidden="true" />
          Live
        </span>
      </div>

      {/* node graph */}
      <div className="p-5 sm:p-7">
        <ul className="flex flex-col">
          {nodes.map((node, i) => {
            const branch = branches.find((b) => b.from === node.id);
            const isLast = i === nodes.length - 1;
            return (
              <li key={node.id}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-[150px] shrink-0 sm:w-[220px]">
                    <NodeChip
                      label={node.label}
                      variant={node.primary ? "primary" : "node"}
                    />
                  </div>
                  {branch ? (
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <span
                        className="hidden h-px w-6 shrink-0 bg-line sm:block"
                        aria-hidden="true"
                      />
                      <NodeChip label={branch.label} variant="branch" />
                    </div>
                  ) : null}
                </div>
                {!isLast ? (
                  <div className="w-[150px] sm:w-[220px]" aria-hidden="true">
                    <span className="mx-auto block h-6 w-0.5 bg-accent" />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

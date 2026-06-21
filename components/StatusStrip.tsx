import { statusBar } from "@/data/portfolio";

export function StatusStrip() {
  return (
    <div className="hairline-b bg-bg">
      <div className="container-shell flex h-9 items-center justify-between gap-4">
        <span className="mono-label flex items-center gap-2 text-muted">
          <span className="status-dot pulse-dot" aria-hidden="true" />
          {statusBar.status}
        </span>

        <span className="mono-label hidden text-faint sm:inline">
          {statusBar.location}
        </span>

        <span className="mono-label hidden text-faint md:inline">
          {statusBar.stack.join(" · ")}
        </span>
      </div>
    </div>
  );
}

import { ArrowUp } from "lucide-react";
import { footerNote, navItems, profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="hairline-t bg-surface">
      <div className="container-shell py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-start">
          <div>
            <a href="#home" className="focus-ring inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-chip border border-accent text-[13px] font-extrabold text-accent">
                {profile.monogram}
              </span>
              <span className="text-base font-extrabold tracking-tight text-text">
                {profile.name}
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-[1.6] text-muted">
              Backend engineer building Go services, developer tools, and
              cloud-native product systems.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mono-label focus-ring font-bold text-muted transition hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href="#home"
              className="focus-ring inline-flex items-center gap-2 rounded-chip border border-linestrong px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-muted transition hover:border-accent hover:text-accent"
            >
              Back to top
              <ArrowUp size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hairline-t mt-10 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label text-faint">
            © {new Date().getFullYear()} {profile.name} — All rights reserved.
          </p>
          <p className="mono-label text-faint">{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}

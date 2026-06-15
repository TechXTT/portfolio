import { ArrowUp } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="container-shell py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#home" className="focus-ring inline-flex items-center gap-3">
              <span className="grid size-9 place-items-center border-2 border-ink bg-accent text-[13px] font-extrabold text-paper">
                MB
              </span>
              <span className="text-base font-extrabold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-4 max-w-sm font-mono text-xs leading-6 text-inksoft">
              Backend engineer building Go services, developer tools, and cloud-native product
              systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="focus-ring inline-grid size-10 place-items-center border-2 border-ink text-ink transition hover:bg-accent hover:text-paper"
                aria-label={label}
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
            <a
              href="#home"
              className="focus-ring inline-grid size-10 place-items-center border-2 border-ink bg-ink text-paper transition hover:bg-accent"
              aria-label="Back to top"
            >
              <ArrowUp size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t-2 border-dashed border-ink/30 pt-6 font-mono text-xs text-inksoft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} — All rights reserved.
          </p>
          <p>Built with Next.js · Tailwind CSS · no templates.</p>
        </div>
      </div>
    </footer>
  );
}

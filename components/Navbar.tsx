"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const ids = ["home", ...navItems.map((i) => i.href.replace("#", ""))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 hairline-b bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <nav
        aria-label="Primary navigation"
        className="container-shell flex h-16 items-center justify-between"
      >
        <a
          href="#home"
          className="focus-ring group flex items-center gap-3"
          onClick={closeMenu}
        >
          <span className="grid size-9 place-items-center rounded-chip border border-accent text-[13px] font-extrabold text-accent">
            {profile.monogram}
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-sm font-extrabold tracking-tight text-text">
              {profile.name}
            </span>
            <span className="mono-label mt-1 text-[10px] text-faint">
              {profile.shortRole}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`mono-label focus-ring rounded-chip px-3 py-2 font-bold transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-accent focus-ring ml-3"
          >
            Let&apos;s talk
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`mailto:${profile.email}`}
            className="btn btn-accent focus-ring px-3.5 py-2.5 text-[0.66rem]"
            onClick={closeMenu}
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="focus-ring inline-grid size-10 place-items-center rounded-chip border border-line text-text"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="hairline-t bg-bg md:hidden">
          <div className="container-shell grid gap-1.5 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mono-label focus-ring rounded-chip border border-line bg-surface px-4 py-3 font-bold text-muted transition hover:border-accent hover:text-accent"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

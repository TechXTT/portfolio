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
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <nav
        aria-label="Primary navigation"
        className="container-shell flex h-16 items-center justify-between"
      >
        <a
          href="#home"
          className="focus-ring group flex items-center gap-3 text-sm font-extrabold"
          onClick={closeMenu}
        >
          <span className="grid size-9 place-items-center border-2 border-ink bg-accent text-[13px] font-extrabold text-paper transition-transform group-hover:-rotate-6">
            MB
          </span>
          <span className="hidden tracking-tight sm:inline">{profile.name}</span>
        </a>

        <div className="hidden items-center md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`focus-ring border-b-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-ink hover:border-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="focus-ring nb-shadow hidden items-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em] text-paper transition hover:bg-accent hover:text-paper md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          type="button"
          className="focus-ring inline-grid size-10 place-items-center border-2 border-ink bg-paper2 text-ink md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t-2 border-ink bg-paper md:hidden">
          <div className="container-shell grid gap-2 py-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="focus-ring border-2 border-ink bg-paper2 px-4 py-3 font-mono text-sm font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-accent hover:text-paper"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring mt-1 border-2 border-ink bg-ink px-4 py-3 text-center font-mono text-sm font-bold uppercase text-paper"
              onClick={closeMenu}
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

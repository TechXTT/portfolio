import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/portfolio";

const contactCards = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", value: "github.com/TechXTT", href: profile.github, icon: Github },
  {
    label: "LinkedIn",
    value: profile.linkedin.replace("https://www.", "").replace(/\/$/, ""),
    href: profile.linkedin,
    icon: Linkedin,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="invert scroll-mt-24 border-t-2 border-ink py-20 sm:py-28"
    >
      <div className="container-shell">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Building backend systems, developer tools, or Go-based projects?"
          description="Let's connect about backend platforms, Go tooling, cloud-native systems, internships, freelance work, or open-source collaboration."
          invert
        />

        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-2 border-paper bg-ink p-7 sm:p-9 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent">
                Direct line
              </p>
              <p className="mt-4 max-w-2xl text-3xl font-extrabold leading-[0.98] tracking-tightest sm:text-4xl">
                Email is the best starting point. GitHub & LinkedIn are there for context.
              </p>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="focus-ring group inline-flex shrink-0 items-center justify-center gap-2 border-2 border-paper bg-accent px-6 py-3.5 text-sm font-extrabold uppercase tracking-[0.04em] text-paper transition hover:bg-paper hover:text-ink"
            >
              <Mail size={18} aria-hidden="true" />
              Send an email
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {contactCards.map(({ label, value, href, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 70}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="nb-hover group flex h-full flex-col border-2 border-paper bg-ink p-6 transition-colors hover:bg-paper hover:text-ink"
                aria-label={`Open ${label}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center border-2 border-current text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.04em]">{label}</p>
                <p className="mt-1.5 break-words font-mono text-xs leading-6 opacity-70">{value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

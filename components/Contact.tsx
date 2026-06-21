import { ArrowDownRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { contactInfo, profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="section-divide scroll-mt-24">
      <div className="container-shell section-pad">
        <SectionHeading
          index="07"
          kicker="Contact"
          title="Let's build something backend-shaped."
          description="Backend platforms, Go tooling, cloud-native systems, internships, freelance work, or open-source collaboration."
        />

        <Reveal>
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="h-[3px] w-full bg-accent" aria-hidden="true" />
            <div className="grid gap-10 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-12">
              {/* left */}
              <div className="flex flex-col">
                <p className="max-w-xl text-base leading-[1.7] text-muted sm:text-[1.0625rem]">
                  Email is the best starting point — GitHub and LinkedIn are there
                  for context. If you&apos;re building something backend-shaped, I&apos;d
                  like to hear about it.
                </p>

                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-accent focus-ring group mt-7 w-fit"
                >
                  Start a conversation
                  <ArrowDownRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <p className="mono-label mt-6 flex items-center gap-2 text-faint">
                  <span className="status-dot pulse-dot size-2" aria-hidden="true" />
                  Available for work · usually replies within a day
                </p>
              </div>

              {/* right: contact.info */}
              <div className="panel overflow-hidden">
                <div className="panel-header justify-between">
                  <span className="mono-label text-faint">contact.info</span>
                  <span className="diamond" aria-hidden="true" />
                </div>
                <dl>
                  {contactInfo.map(({ label, value, href }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 px-4 py-3.5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-line"
                    >
                      <dt className="mono-label text-faint">{label}</dt>
                      <dd className="min-w-0">
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="focus-ring block truncate font-mono text-xs text-muted transition hover:text-accent"
                            aria-label={`Open ${label}`}
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="block truncate font-mono text-xs text-muted">
                            {value}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

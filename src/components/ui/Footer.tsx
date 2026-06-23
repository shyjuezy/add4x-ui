import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/icons/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-start">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Add4x home"
              className="flex items-center gap-2.5 font-semibold tracking-tight"
            >
              <Logo size={26} />
              <span className="text-[15px] text-[var(--color-ink)]">Add4x</span>
            </Link>
            <p className="text-[13px] text-[var(--color-ink-muted)] max-w-xs leading-relaxed">
              {site.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Site</p>
            {site.footer.links.map((link) => {
              const isExternal = /^https?:\/\//.test(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors w-fit"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div
            className="flex flex-col gap-3"
            itemScope
            itemType="https://schema.org/Person"
          >
            <p className="eyebrow mb-2">Leadership</p>
            <p className="text-[14px] text-[var(--color-ink)]" itemProp="name">
              {site.leadership.name}
            </p>
            <p
              className="text-[13px] text-[var(--color-ink-muted)]"
              itemProp="jobTitle"
            >
              {site.leadership.title}
            </p>
            <a
              href={`mailto:${site.leadership.email}`}
              className="text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors w-fit"
              itemProp="email"
            >
              {site.leadership.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="eyebrow mb-2">Contact</p>
            <a
              href={`mailto:${site.meta.contactEmail}`}
              className="text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors w-fit"
            >
              {site.meta.contactEmail}
            </a>
            <p className="text-[13px] text-[var(--color-ink-dim)]">
              {site.meta.domain}
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--color-ink-dim)]">
            {site.footer.copyright}
          </p>
          <p className="text-[12px] text-[var(--color-ink-dim)]">
            Built without friction.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { site } from "@/content/site";

export function TrustStrip() {
  return (
    <section
      aria-label="Add4x business summary"
      className="border-y border-[var(--color-line)] bg-[var(--color-bg)]"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-3 md:gap-12 text-center md:text-left">
          {site.trust.map((line, i) => (
            <p
              key={i}
              className="text-[13px] leading-relaxed text-[var(--color-ink-muted)]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

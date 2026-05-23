import { site } from "@/content/site";

export function Capabilities() {
  const { eyebrow, heading, items } = site.capabilities;

  return (
    <section id="platform" className="relative overflow-hidden py-32 md:py-48">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="glow"
        style={{
          width: 600,
          height: 600,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,45,111,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-[820px] mx-auto text-center mb-20 md:mb-28">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-md mt-6 text-[clamp(32px,5vw,56px)] text-[var(--color-ink)]">
            {Array.isArray(heading)
              ? heading.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))
              : heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.map((item) => (
            <article
              key={item.number}
              className="card-surface p-8 md:p-10 hover:border-[var(--color-line-strong)] transition-colors"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[13px] font-medium tracking-tight text-[var(--color-accent)]">
                  {item.number}
                </span>
                <span className="h-px w-8 bg-[var(--color-line-strong)]" />
              </div>
              <h3 className="display-md mt-6 text-[22px] md:text-[26px] text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.65] text-[var(--color-ink-muted)] max-w-[420px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

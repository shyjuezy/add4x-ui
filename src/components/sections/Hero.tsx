import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { eyebrow, headlineLines, lead, primaryCta, secondaryCta } = site.hero;

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="glow"
        style={{
          width: 720,
          height: 720,
          top: -120,
          right: -80,
          background:
            "radial-gradient(circle, rgba(255,45,111,0.35) 0%, rgba(255,128,179,0.18) 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="glow"
        style={{
          width: 560,
          height: 560,
          top: 180,
          left: -160,
          background:
            "radial-gradient(circle, rgba(255,45,111,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Dotted grid backdrop */}
      <div
        aria-hidden="true"
        className="grid-backdrop absolute inset-0 opacity-60"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-28 md:pb-40 text-center">
        <p className="eyebrow reveal">{eyebrow}</p>

        <h1 className="display reveal reveal-delay-1 mt-8 text-[clamp(48px,8vw,104px)]">
          {headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line.accent ? (
                <span className="text-accent-gradient">{line.text}</span>
              ) : (
                line.text
              )}
            </span>
          ))}
        </h1>

        <p className="reveal reveal-delay-2 mx-auto mt-10 max-w-[640px] text-[17px] md:text-[18px] leading-[1.6] text-[var(--color-ink-muted)]">
          {lead}
        </p>

        <div className="reveal reveal-delay-3 mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary">
            {secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

import { site } from "@/content/site";
import { CircuitTraces } from "@/components/decoration/CircuitTraces";

export function Contact() {
  const { eyebrow, heading, lead, email } = site.contact;

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-line)] pt-8 md:pt-12 pb-32 md:pb-48"
    >
      <div
        aria-hidden="true"
        className="glow"
        style={{
          width: 800,
          height: 800,
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(255,45,111,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <CircuitTraces className="mx-auto w-full max-w-[760px] h-auto mb-6 md:mb-8" />

        <p className="eyebrow text-[var(--color-accent)]">{eyebrow}</p>
        <h2 className="display-md mt-6 text-[clamp(32px,5vw,56px)] text-[var(--color-ink)] max-w-[820px] mx-auto">
          {heading}
        </h2>
        <p className="mt-6 max-w-[560px] mx-auto text-[16px] md:text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
          {lead}
        </p>

        <a
          href={`mailto:${email}`}
          className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)] transition-colors shadow-[0_8px_32px_rgba(255,45,111,0.30)]"
        >
          {email}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

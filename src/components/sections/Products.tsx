import { site } from "@/content/site";

export function Products() {
  const { eyebrow, heading, items } = site.products;

  return (
    <section
      id="products"
      className="relative overflow-hidden border-t border-[var(--color-line)] py-32 md:py-48"
    >
      <div
        aria-hidden="true"
        className="grid-backdrop absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="glow"
        style={{
          width: 680,
          height: 680,
          top: "10%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(255,45,111,0.20) 0%, rgba(255,128,179,0.10) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-20">
          <p className="eyebrow text-[var(--color-accent)]">{eyebrow}</p>
          <h2 className="display-md mt-6 text-[clamp(32px,5vw,56px)] text-[var(--color-ink)]">
            {heading}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-1 max-w-[860px] mx-auto">
          {items.map((item) => (
            <ProductCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Product = (typeof site.products.items)[number];

function ProductCard({ item }: { item: Product }) {
  return (
    <article className="card-surface relative overflow-hidden p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12 items-start">
        <div
          aria-hidden="true"
          className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center shadow-[0_8px_32px_rgba(255,45,111,0.25)]"
        >
          <span className="font-semibold text-[var(--color-ink)] text-[28px] md:text-[34px] tracking-tight">
            mm
          </span>
        </div>

        <div className="max-w-[560px]">
          <h3 className="display-md text-[32px] md:text-[40px] text-[var(--color-ink)]">
            {item.name}
          </h3>
          <p className="mt-4 text-[16px] leading-[1.65] text-[var(--color-ink-muted)]">
            {item.body}
          </p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 text-[13px]">
            {item.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1.5">
                <dt className="eyebrow">{m.label}</dt>
                <dd className="text-[var(--color-ink)]">{m.value}</dd>
              </div>
            ))}
          </dl>

          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="link-underline mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-accent)]"
          >
            Visit muffinmenu.com
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

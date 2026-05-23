import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  external?: boolean;
};

const sizes = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14px]",
};

const base =
  "inline-flex items-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 whitespace-nowrap";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-line-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ghost:
    "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] px-0 underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
}: ButtonProps) {
  const className = `${base} ${sizes[size]} ${variants[variant]}`;
  const isExternal = external ?? /^https?:\/\//.test(href);
  const isMail = href.startsWith("mailto:");

  if (isExternal || isMail) {
    return (
      <a
        href={href}
        className={className}
        target={isExternal && !isMail ? "_blank" : undefined}
        rel={isExternal && !isMail ? "noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

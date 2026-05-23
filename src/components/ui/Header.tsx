"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/icons/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-[var(--color-bg)]/75 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-[64px] flex items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="Add4x home"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <Logo size={26} />
          <span className="text-[15px] text-[var(--color-ink)]">Add4x</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {site.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-[14px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={site.nav.cta.href}
          className="inline-flex items-center px-4 py-2 rounded-full text-[13px] font-medium tracking-tight bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          {site.nav.cta.label}
        </a>
      </div>
    </header>
  );
}

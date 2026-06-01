"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { siteConfig } from "@/lib/siteConfig";
import {
  CalculatorIcon,
  MenuIcon,
  PhoneOutlineIcon,
  ScalesIcon,
} from "./icons";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/deadline-calculator", label: "محاسبه موعد" },
  { href: "/articles", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
] as const;

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = isNavActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold",
        active
          ? "text-lawwin-gold"
          : "text-lawwin-on-navy/90 hover:bg-white/5 hover:text-lawwin-on-navy",
      )}
    >
      {label}
      {active ? (
        <span
          className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-lawwin-gold"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-lawwin-navy-deepest shadow-md shadow-black/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex min-h-[4.25rem] items-center justify-between gap-3 py-2">
          {/* برند — سمت راست در RTL */}
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-2.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold sm:gap-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lawwin-gold/15 text-lawwin-gold ring-1 ring-lawwin-gold/30 sm:size-11">
              <ScalesIcon className="size-6 sm:size-7" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-bold tracking-tight text-lawwin-on-navy sm:text-lg">
                {siteConfig.siteName}
              </span>
              <span className="hidden text-xs text-lawwin-muted-on-navy sm:block">
                محاسبه موعد قانونی
              </span>
            </span>
          </Link>

          {/* ناوبری دسکتاپ */}
          <nav
            aria-label="ناوبری اصلی"
            className="hidden flex-1 justify-center lg:flex"
          >
            <ul className="flex flex-wrap items-center justify-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    pathname={pathname}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA و تماس — سمت چپ در RTL */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-lawwin-on-navy/90 no-underline transition-colors hover:bg-white/5 hover:text-lawwin-on-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold md:inline-flex"
              dir="ltr"
            >
              <PhoneOutlineIcon className="size-4 shrink-0" />
              <span className="tabular-nums">{siteConfig.phoneDisplay}</span>
            </a>

            <Link
              href="/deadline-calculator"
              className={cn(
                brandPrimaryButtonClassName,
                "px-4 sm:px-5",
              )}
            >
              <CalculatorIcon className="size-4 shrink-0" />
              <span className="hidden sm:inline">شروع محاسبه</span>
              <span className="sm:hidden">محاسبه</span>
            </Link>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-xl text-lawwin-on-navy transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-main-nav"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span className="sr-only">منوی اصلی</span>
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>

        {/* منوی موبایل */}
        {mobileOpen ? (
          <nav
            id="mobile-main-nav"
            aria-label="ناوبری موبایل"
            className="border-t border-white/10 pb-4 pt-2 lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    pathname={pathname}
                    onNavigate={closeMobile}
                  />
                </li>
              ))}
            </ul>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-lawwin-on-navy/90 no-underline hover:bg-white/5 md:hidden"
              dir="ltr"
              onClick={closeMobile}
            >
              <PhoneOutlineIcon className="size-4" />
              {siteConfig.phoneDisplay}
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

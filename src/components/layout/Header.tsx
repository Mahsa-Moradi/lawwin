import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/deadline-calculator", label: "محاسبه موعد" },
  { href: "/articles", label: "مقالات" },
  { href: "/about", label: "درباره" },
  { href: "/contact", label: "تماس" },
] as const;

export function Header() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 no-underline"
        >
          {siteConfig.siteName}
        </Link>
        <nav aria-label="ناوبری اصلی">
          <ul className="flex flex-wrap items-center gap-1 sm:justify-end sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 no-underline transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

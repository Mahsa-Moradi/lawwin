import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { ScalesIcon } from "./icons";

const footerLinks = [
  { href: "/deadline-calculator", label: "محاسبه موعد" },
  { href: "/articles", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
] as const;

const footerLinkClass =
  "block py-1.5 text-sm text-lawwin-muted-on-navy no-underline transition-colors hover:text-lawwin-gold focus-visible:text-lawwin-gold focus-visible:outline-none";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-lawwin-navy-deepest text-lawwin-on-navy">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-lawwin-gold/15 text-lawwin-gold ring-1 ring-lawwin-gold/30">
                <ScalesIcon className="size-6" />
              </span>
              <span className="text-lg font-bold text-lawwin-on-navy">
                {siteConfig.siteName}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-lawwin-muted-on-navy">
              ابزار راهنمای محاسبهٔ مواعد قانونی با تقویم شمسی و قواعد آیین
              دادرسی مدنی.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-lawwin-muted-on-navy/90">
              این وب‌سایت نسخهٔ آزمایشی است و جایگزین مشاورهٔ تخصصی حقوقی
              نیست. برای تصمیم‌گیری نهایی با وکیل مشورت کنید.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold text-lawwin-gold">
              دسترسی سریع
            </p>
            <ul className="mt-4 space-y-0.5">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-semibold text-lawwin-gold">
              اطلاعات تماس
            </p>
            <ul className="mt-4 space-y-3 text-sm text-lawwin-muted-on-navy">
              <li>
                <span className="block text-xs text-lawwin-muted-on-navy/80">
                  تلفن
                </span>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="font-medium text-lawwin-on-navy no-underline transition-colors hover:text-lawwin-gold"
                  dir="ltr"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs text-lawwin-muted-on-navy/80">
                  ایمیل
                </span>
                <span className="font-mono text-lawwin-on-navy" dir="ltr">
                  {siteConfig.contactEmail}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-lawwin-muted-on-navy sm:text-start">
            © {year} {siteConfig.siteName}. تمامی حقوق محفوظ است.
          </p>
          <p className="text-center text-xs text-lawwin-muted-on-navy/80">
            محاسبه موعد قانونی — راهنما، نه مشاورهٔ تخصصی
          </p>
        </div>
      </div>
    </footer>
  );
}

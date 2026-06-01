import Link from "next/link";
import { homePopularDeadlines } from "@/data/homeContent";
import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeadlineActionCard, SectionLight } from "./homeLayout";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M8 12h8m0 0-3-3m3 3-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomePopularDeadlines() {
  return (
    <SectionLight className="bg-zinc-50/50">
      <SectionHeading centered className="mb-12">
        محبوب‌ترین مواعد قانونی
      </SectionHeading>
      <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-sm text-zinc-600">
        میانبر به محاسبه‌گر — نوع مهلت را در صفحهٔ محاسبه انتخاب کنید.
      </p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
        {homePopularDeadlines.map((item) => (
          <li key={item.title}>
            <Link
              href="/deadline-calculator"
              className="block h-full no-underline outline-none"
            >
              <DeadlineActionCard className="items-center ps-6 text-center sm:items-stretch sm:text-start">
                <span className="inline-flex items-center rounded-full bg-lawwin-navy-deepest px-3 py-1 text-xs font-bold text-lawwin-gold ring-1 ring-lawwin-gold/30">
                  {item.duration}
                </span>
                <h3 className="mt-4 text-sm font-semibold leading-snug text-zinc-900 sm:text-base">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-lawwin-gold opacity-80 transition-all group-hover:gap-2 group-hover:opacity-100">
                  شروع محاسبه
                  <ArrowIcon className="size-4 rtl:rotate-180" />
                </span>
              </DeadlineActionCard>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex justify-center">
        <Link
          href="/deadline-calculator"
          className={cn(
            brandPrimaryButtonClassName,
            "bg-lawwin-navy-deepest px-8 shadow-lg shadow-black/20 hover:bg-lawwin-navy",
          )}
        >
          مشاهده همه مواعد
        </Link>
      </div>
    </SectionLight>
  );
}

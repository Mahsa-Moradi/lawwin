import Link from "next/link";
import { homePopularDeadlines } from "@/data/homeContent";
import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PremiumCard, SectionLight } from "./homeLayout";

export function HomePopularDeadlines() {
  return (
    <SectionLight>
      <SectionHeading centered className="mb-10">
        محبوب‌ترین مواعد قانونی
      </SectionHeading>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {homePopularDeadlines.map((item) => (
          <li key={item.title}>
            <Link
              href="/deadline-calculator"
              className="block h-full no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lawwin-gold"
            >
              <PremiumCard className="flex h-full flex-col items-center text-center transition-colors hover:border-lawwin-gold/40">
                <span className="flex size-10 items-center justify-center rounded-full bg-lawwin-gold/15 text-xs font-bold text-lawwin-gold ring-1 ring-lawwin-gold/30">
                  {item.duration}
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-zinc-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-lawwin-gold">
                  {item.duration}
                </p>
              </PremiumCard>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <Link
          href="/deadline-calculator"
          className={cn(brandPrimaryButtonClassName, "bg-lawwin-navy-deepest px-8 hover:bg-lawwin-navy")}
        >
          مشاهده همه مواعد
        </Link>
      </div>
    </SectionLight>
  );
}

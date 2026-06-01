import Link from "next/link";
import { homeFaqPreview } from "@/data/homeContent";
import { brandPrimaryButtonClassName } from "@/components/ui/brandButtonStyles";
import { cn } from "@/components/ui/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLight } from "./homeLayout";

export function HomeFaqPreview() {
  return (
    <SectionLight id="faq-preview">
      <SectionHeading centered className="mb-8">
        سوالات متداول
      </SectionHeading>
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
        {homeFaqPreview.map((item) => (
          <details
            key={item.q}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
          >
            <summary className="cursor-pointer select-none text-sm font-semibold text-zinc-900">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {item.a}
            </p>
          </details>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-zinc-600">
        پاسخ‌های بیشتر در صفحهٔ{" "}
        <Link
          href="/deadline-calculator#faq"
          className="font-semibold text-lawwin-navy underline-offset-2 hover:underline"
        >
          محاسبه موعد قانونی
        </Link>
        .
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/deadline-calculator#faq"
          className={cn(
            brandPrimaryButtonClassName,
            "bg-lawwin-navy-deepest hover:bg-lawwin-navy",
          )}
        >
          مشاهده همه سوالات
        </Link>
      </div>
    </SectionLight>
  );
}

import { homeHowItWorks } from "@/data/homeContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  StepCalendarIcon,
  StepCheckIcon,
  StepListIcon,
} from "./homeIcons";
import { SectionMuted } from "./homeLayout";

const stepIcons = [StepListIcon, StepCalendarIcon, StepCheckIcon] as const;

export function HomeHowItWorks() {
  return (
    <SectionMuted id="how-it-works">
      <SectionHeading id="how-it-works-heading" centered className="mb-10">
        چطور کار می‌کند؟
      </SectionHeading>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {homeHowItWorks.map((item, index) => {
          const Icon = stepIcons[index] ?? StepListIcon;
          const isLast = index === homeHowItWorks.length - 1;
          return (
            <li key={item.step} className="relative flex flex-col items-center text-center">
              {!isLast ? (
                <span
                  className="absolute top-8 hidden h-px w-full bg-zinc-300 md:block md:w-[calc(100%+1.5rem)] md:-translate-x-1/2"
                  style={{ insetInlineStart: "50%" }}
                  aria-hidden
                />
              ) : null}
              <span className="relative flex size-16 items-center justify-center rounded-full bg-lawwin-navy-deepest text-lawwin-gold shadow-md ring-4 ring-white">
                <Icon className="size-7" />
                <span className="absolute -top-1 -end-1 flex size-7 items-center justify-center rounded-full bg-lawwin-gold text-xs font-bold text-lawwin-navy-deepest">
                  {item.step}
                </span>
              </span>
              <h3 className="mt-4 text-base font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </SectionMuted>
  );
}

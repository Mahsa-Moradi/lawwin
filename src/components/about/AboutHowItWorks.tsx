import { aboutHowItWorks } from "@/data/aboutContent";
import {
  StepCalendarIcon,
  StepCheckIcon,
  StepListIcon,
} from "@/components/home/homeIcons";
import {
  AboutSection,
  AboutSectionHeading,
} from "./aboutLayout";
import { StepCalculatorIcon } from "./aboutIcons";

const stepIcons = [
  StepListIcon,
  StepCalendarIcon,
  StepCalculatorIcon,
  StepCheckIcon,
] as const;

export function AboutHowItWorks() {
  return (
    <AboutSection>
      <AboutSectionHeading className="mb-8 sm:mb-10">
        لاوین چگونه کار می‌کند؟
      </AboutSectionHeading>
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
        {aboutHowItWorks.map((item, index) => {
          const Icon = stepIcons[index] ?? StepListIcon;
          const isLast = index === aboutHowItWorks.length - 1;
          return (
            <li
              key={item.step}
              className="relative flex flex-col items-center text-center"
            >
              {!isLast ? (
                <span
                  className="absolute top-8 hidden h-px w-full bg-lawwin-gold/35 md:block"
                  style={{
                    insetInlineStart: "50%",
                    width: "calc(100% + 1rem)",
                  }}
                  aria-hidden
                />
              ) : null}
              <span className="relative flex size-14 items-center justify-center rounded-full bg-lawwin-navy text-lawwin-gold shadow-lg ring-2 ring-lawwin-gold/30 sm:size-16">
                <Icon className="size-6 sm:size-7" />
                <span className="absolute -top-1 -end-1 flex size-6 items-center justify-center rounded-full bg-lawwin-gold text-xs font-bold text-lawwin-navy-deepest">
                  {item.step}
                </span>
              </span>
              <h3 className="mt-3 text-sm font-semibold text-lawwin-on-navy sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 max-w-[14rem] text-xs leading-relaxed text-lawwin-muted-on-navy sm:text-sm">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </AboutSection>
  );
}

import { homeFeatures } from "@/data/homeContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  ScalesFeatureIcon,
  TimelineFeatureIcon,
} from "./homeIcons";
import { PremiumCard, SectionLight } from "./homeLayout";

const icons = [
  ScalesFeatureIcon,
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  TimelineFeatureIcon,
] as const;

export function HomeFeatureCards() {
  return (
    <SectionLight>
      <SectionHeading centered className="mb-10">
        چرا لاوین انتخاب حرفه‌ای‌هاست؟
      </SectionHeading>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {homeFeatures.map((feature, index) => {
          const Icon = icons[index] ?? ScalesFeatureIcon;
          return (
            <li key={feature.title}>
              <PremiumCard className="h-full">
                <span className="flex size-12 items-center justify-center rounded-xl bg-lawwin-gold/15 text-lawwin-gold ring-1 ring-lawwin-gold/25">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {feature.description}
                </p>
              </PremiumCard>
            </li>
          );
        })}
      </ul>
    </SectionLight>
  );
}

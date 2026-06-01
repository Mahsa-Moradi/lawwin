import { homeFeatures } from "@/data/homeContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  ScalesFeatureIcon,
  TimelineFeatureIcon,
} from "./homeIcons";
import { FeaturePremiumCard, SectionLight } from "./homeLayout";

const icons = [
  ScalesFeatureIcon,
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  TimelineFeatureIcon,
] as const;

export function HomeFeatureCards() {
  return (
    <SectionLight className="bg-white">
      <SectionHeading centered className="mb-12">
        چرا لاوین انتخاب حرفه‌ای‌هاست؟
      </SectionHeading>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {homeFeatures.map((feature, index) => {
          const Icon = icons[index] ?? ScalesFeatureIcon;
          return (
            <li key={feature.title}>
              <FeaturePremiumCard>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lawwin-gold/20 to-lawwin-gold/5 text-lawwin-gold shadow-inner shadow-lawwin-gold/10 ring-1 ring-lawwin-gold/25 transition-transform duration-200 group-hover:scale-105">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-5 text-base font-semibold leading-snug text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                  {feature.description}
                </p>
              </FeaturePremiumCard>
            </li>
          );
        })}
      </ul>
    </SectionLight>
  );
}

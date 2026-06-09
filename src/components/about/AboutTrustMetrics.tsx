import { aboutTrustMetrics } from "@/data/aboutContent";
import {
  CalendarFeatureIcon,
  ScalesFeatureIcon,
} from "@/components/home/homeIcons";
import { AboutPremiumCard, AboutSection, AboutSectionHeading } from "./aboutLayout";
import { ShieldLimitIcon } from "./aboutIcons";

const metricIcons = [
  ScalesFeatureIcon,
  null,
  CalendarFeatureIcon,
  ShieldLimitIcon,
] as const;

export function AboutTrustMetrics() {
  return (
    <AboutSection muted>
      <AboutSectionHeading className="mb-8 sm:mb-10">
        چرا به لاوین اعتماد کنید؟
      </AboutSectionHeading>
      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {aboutTrustMetrics.map((item, index) => {
          const Icon = metricIcons[index];
          return (
            <li key={item.label}>
              <AboutPremiumCard className="text-center">
                {Icon ? (
                  <Icon className="mx-auto size-7 text-lawwin-gold" />
                ) : (
                  <span
                    className="mx-auto block text-2xl font-bold text-lawwin-gold"
                    aria-hidden
                  >
                    ⇄
                  </span>
                )}
                <p className="mt-3 text-2xl font-bold text-lawwin-gold sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-lawwin-muted-on-navy sm:text-sm">
                  {item.label}
                </p>
              </AboutPremiumCard>
            </li>
          );
        })}
      </ul>
    </AboutSection>
  );
}

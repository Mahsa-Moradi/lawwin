import { aboutWhatItDoes } from "@/data/aboutContent";
import {
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  ScalesFeatureIcon,
  TimelineFeatureIcon,
} from "@/components/home/homeIcons";
import {
  AboutIconBox,
  AboutPremiumCard,
  AboutSection,
  AboutSectionHeading,
} from "./aboutLayout";

const icons = [
  ScalesFeatureIcon,
  CalendarFeatureIcon,
  HolidayFeatureIcon,
  TimelineFeatureIcon,
] as const;

export function AboutWhatItDoes() {
  return (
    <AboutSection muted>
      <AboutSectionHeading className="mb-8 sm:mb-10">
        لاوین چه کاری برای شما انجام می‌دهد؟
      </AboutSectionHeading>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {aboutWhatItDoes.map((item, index) => {
          const Icon = icons[index] ?? ScalesFeatureIcon;
          return (
            <li key={item.title}>
              <AboutPremiumCard className="text-center sm:text-start">
                <AboutIconBox className="mx-auto sm:mx-0">
                  <Icon className="size-6 sm:size-7" />
                </AboutIconBox>
                <h3 className="mt-4 text-base font-semibold text-lawwin-on-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-lawwin-muted-on-navy">
                  {item.description}
                </p>
              </AboutPremiumCard>
            </li>
          );
        })}
      </ul>
    </AboutSection>
  );
}

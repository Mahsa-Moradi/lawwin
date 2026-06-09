import { aboutWhyCreated } from "@/data/aboutContent";
import {
  AboutIconBox,
  AboutPremiumCard,
  AboutSection,
  AboutSectionHeading,
} from "./aboutLayout";
import {
  CalendarOffIcon,
  HourglassIcon,
  WarningProblemIcon,
} from "./aboutIcons";

const icons = [WarningProblemIcon, CalendarOffIcon, HourglassIcon] as const;

export function AboutWhyCreated() {
  return (
    <AboutSection muted>
      <AboutSectionHeading className="mb-8 sm:mb-10">
        چرا لاوین ساخته شد؟
      </AboutSectionHeading>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {aboutWhyCreated.map((item, index) => {
          const Icon = icons[index] ?? WarningProblemIcon;
          return (
            <li key={item.title}>
              <AboutPremiumCard>
                <AboutIconBox>
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

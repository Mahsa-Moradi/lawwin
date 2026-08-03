import { ContactEmailLinks } from "@/components/layout/ContactEmailLinks";
import {
  AboutPremiumCard,
  AboutSection,
  AboutSectionHeading,
} from "./aboutLayout";

export function AboutContact() {
  return (
    <AboutSection id="contact">
      <AboutSectionHeading>تماس با ما</AboutSectionHeading>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-lawwin-muted-on-navy sm:text-base">
        برای ارتباط با تیم لاوین، روی یکی از ایمیل‌های زیر کلیک کنید تا برنامهٔ
        ایمیل شما باز شود.
      </p>
      <AboutPremiumCard className="mx-auto mt-6 max-w-md">
        <ContactEmailLinks linkClassName="text-lawwin-on-navy hover:text-lawwin-gold" />
      </AboutPremiumCard>
    </AboutSection>
  );
}

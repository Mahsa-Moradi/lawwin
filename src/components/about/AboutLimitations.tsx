import { aboutLimitations } from "@/data/aboutContent";
import { AboutSection, AboutSectionHeading } from "./aboutLayout";
import { ShieldLimitIcon } from "./aboutIcons";

export function AboutLimitations() {
  return (
    <AboutSection>
      <AboutSectionHeading className="mb-6 sm:mb-8">
        محدودیت‌ها
      </AboutSectionHeading>
      <div className="mx-auto max-w-3xl rounded-2xl border border-lawwin-gold/40 bg-gradient-to-br from-lawwin-gold/10 to-lawwin-navy/60 p-5 shadow-xl shadow-lawwin-gold/5 sm:p-7">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-start">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-lawwin-gold/40 bg-lawwin-gold/15 text-lawwin-gold">
            <ShieldLimitIcon className="size-7" />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-lawwin-gold">
              لاوین جایگزین وکیل نیست
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-lawwin-on-navy/90">
              {aboutLimitations.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-lawwin-gold"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AboutSection>
  );
}

import { homeTrustMetrics } from "@/data/homeContent";
import { SectionDark } from "./homeLayout";

export function HomeTrustMetrics() {
  return (
    <SectionDark>
      <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {homeTrustMetrics.map((item) => (
          <li key={item.label} className="text-center">
            <p className="text-3xl font-bold text-lawwin-gold sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm font-medium text-lawwin-muted-on-navy">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </SectionDark>
  );
}

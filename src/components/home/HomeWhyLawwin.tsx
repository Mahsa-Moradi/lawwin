import { homeAdvantages } from "@/data/homeContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionMuted } from "./homeLayout";

export function HomeWhyLawwin() {
  return (
    <SectionMuted>
      <SectionHeading centered className="mb-10">
        مزایای لاوین
      </SectionHeading>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {homeAdvantages.map((item) => (
          <li key={item.title} className="text-center">
            <span
              className="mx-auto flex size-12 items-center justify-center rounded-full bg-lawwin-gold/20 text-lg font-bold text-lawwin-navy-deepest"
              aria-hidden
            >
              ✓
            </span>
            <h3 className="mt-3 text-base font-semibold text-zinc-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </SectionMuted>
  );
}

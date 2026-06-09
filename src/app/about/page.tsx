import type { Metadata } from "next";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutHowItWorks } from "@/components/about/AboutHowItWorks";
import { AboutLimitations } from "@/components/about/AboutLimitations";
import { AboutTrustMetrics } from "@/components/about/AboutTrustMetrics";
import { AboutWhatItDoes } from "@/components/about/AboutWhatItDoes";
import { AboutWhyCreated } from "@/components/about/AboutWhyCreated";

export const metadata: Metadata = {
  title: "درباره لاوین",
  description:
    "هدف لاوین، معرفی ابزار محاسبهٔ مواعد حقوقی و مسیر توسعهٔ آینده (نسخهٔ MVP).",
};

export default function AboutPage() {
  return (
    <div className="bg-lawwin-navy-deepest">
      <AboutHero />
      <AboutWhyCreated />
      <AboutHowItWorks />
      <AboutWhatItDoes />
      <AboutLimitations />
      <AboutTrustMetrics />
      <AboutCta />
    </div>
  );
}

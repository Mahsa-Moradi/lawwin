import type { Metadata } from "next";
import { HomeFaqPreview } from "@/components/home/HomeFaqPreview";
import { HomeFeatureCards } from "@/components/home/HomeFeatureCards";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeHowItWorks } from "@/components/home/HomeHowItWorks";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { HomePopularDeadlines } from "@/components/home/HomePopularDeadlines";
import { HomeTrustMetrics } from "@/components/home/HomeTrustMetrics";
import { HomeWhyLawwin } from "@/components/home/HomeWhyLawwin";

export const metadata: Metadata = {
  title: "محاسبه مواعد قانونی",
  description:
    "لاوین — محاسبه‌گر فارسی مواعد حقوقی با تقویم شمسی، آیین دادرسی مدنی، تعطیلات رسمی و نمایش روند محاسبه.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeFeatureCards />
      <HomeHowItWorks />
      <HomePopularDeadlines />
      <HomeWhyLawwin />
      <HomeTrustMetrics />
      <HomeFaqPreview />
      <HomeNewsletter />
    </>
  );
}

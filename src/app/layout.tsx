import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "لاوین — ابزار محاسبه مواعد حقوقی",
    template: "%s | لاوین",
  },
  description:
    "راهنمای ساده برای محاسبهٔ مواعد قانونی با تقویم شمسی و لحاظ تعطیلات رسمی.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        آینده: برای چندزبانه می‌توان lang و dir را از لایهٔ locale (مثلاً fa | en) خواند.
        فعلاً پیش‌فرض فارسی و RTL است.
      */}
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}

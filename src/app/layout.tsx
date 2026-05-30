import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { FloatingSupportWidget } from "@/components/layout/FloatingSupportWidget";
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
    default: "لاوین — محاسبه‌گر مواعد حقوقی (نسخه آزمایشی)",
    template: "%s | لاوین",
  },
  description:
    "ابزار فارسی و شمسی‌محور برای محاسبهٔ مواعد قانونی با لحاظ تعطیلات رسمی. (نسخه آزمایشی برای تست عمومی)",
  icons: {
    icon: "/favicon.ico",
  },
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
        <FloatingSupportWidget />
      </body>
    </html>
  );
}

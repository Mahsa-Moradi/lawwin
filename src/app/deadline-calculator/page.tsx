import type { Metadata } from "next";
import { DeadlineForm } from "@/components/deadline/DeadlineForm";

export const metadata: Metadata = {
  title: "محاسبه موعد قانونی",
  description:
    "محاسبهٔ مهلت بر اساس تاریخ شروع، نوع موعد و تعطیلات رسمی (نسخهٔ راهنما).",
};

export default function DeadlineCalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="border-b border-zinc-200 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          محاسبه موعد قانونی
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-zinc-600 leading-relaxed">
          تاریخ شروع مهلت را به شمسی وارد کنید، نوع موعد را انتخاب کنید و در صورت
          نیاز تعطیلات رسمی را در نظر بگیرید. خروجی شامل مهلت اولیه، مهلت نهایی و
          توضیح متنی است. این ابزار صرفاً راهنماست و جایگزین مشاورهٔ حقوقی نیست.
        </p>
      </header>

      <DeadlineForm />
    </div>
  );
}

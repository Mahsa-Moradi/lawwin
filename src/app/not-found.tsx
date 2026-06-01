import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          صفحه پیدا نشد
        </h1>
        <p className="mt-4 text-pretty text-sm leading-7 text-zinc-600 sm:text-base">
          آدرس واردشده وجود ندارد یا ممکن است به‌زودی اضافه شود.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <ButtonLink href="/" variant="secondary">
            بازگشت به خانه
          </ButtonLink>
          <ButtonLink href="/deadline-calculator" variant="primary">
            رفتن به محاسبه‌گر موعد
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}


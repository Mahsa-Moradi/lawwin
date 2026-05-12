import { siteConfig } from "@/lib/siteConfig";

type FloatingCallButtonProps = {
  /** اگر نیاز به override موقت داشتید؛ پیش‌فرض از siteConfig */
  telHref?: string;
  label?: string;
};

export function FloatingCallButton({
  telHref = `tel:${siteConfig.phoneTel}`,
  label = "تماس تلفنی",
}: FloatingCallButtonProps) {
  return (
    <a
      href={telHref}
      className="fixed inset-inline-end-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 transition-transform hover:scale-105 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none motion-reduce:hover:scale-100"
      aria-label={`${label} — ${siteConfig.phoneDisplay}`}
      title={`${label}: ${siteConfig.phoneDisplay}`}
    >
      <span className="sr-only">
        {label}، شماره {siteConfig.phoneDisplay}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.027.02-.067.049-.093.152a18.75 18.75 0 0 0 6.668 6.668c.103.026.133.066.153.093l.97 1.293a1.875 1.875 0 0 1 1.955.694l4.423 1.106c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}

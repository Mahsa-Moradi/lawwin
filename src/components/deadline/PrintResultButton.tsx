"use client";

type PrintResultButtonProps = {
  targetId: string;
  className?: string;
};

const defaultClassName =
  "rounded-lg border border-amber-600/40 bg-white px-3 py-2 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700";

export function PrintResultButton({
  targetId,
  className,
}: PrintResultButtonProps) {
  const handlePrint = () => {
    const el = document.getElementById(targetId);
    if (!el) {
      window.print();
      return;
    }
    el.classList.add("print-deadline-result");
    window.print();
    window.setTimeout(() => {
      el.classList.remove("print-deadline-result");
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={`inline-flex items-center ${className ?? defaultClassName}`}
    >
      چاپ
    </button>
  );
}

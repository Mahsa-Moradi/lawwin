"use client";

import { useState } from "react";

type CopyResultButtonProps = {
  textToCopy: string;
  label?: string;
  className?: string;
};

const defaultClassName =
  "rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900";

export function CopyResultButton({
  textToCopy,
  label = "کپی نتیجه",
  className,
}: CopyResultButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center ${className ?? defaultClassName}`}
    >
      {copied ? "کپی شد" : label}
    </button>
  );
}

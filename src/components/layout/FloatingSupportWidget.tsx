"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const fabClass =
  "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.027.02-.067.049-.093.152a18.75 18.75 0 0 0 6.668 6.668c.103.026.133.066.153.093l.97 1.293a1.875 1.875 0 0 1 1.955.694l4.423 1.106c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 1.22 3.948 2.462.6 1.24.6 2.88 0 4.12-.6 1.24-1.97 2.17-3.948 2.462A49.9 49.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.152-1.629l-3.09 1.03a.75.75 0 0 1-.978-.728l.742-3.704A9.72 9.72 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type MenuLinkProps = {
  href: string;
  label: string;
  onSelect: () => void;
};

function MenuLink({ href, label, onSelect }: MenuLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      role="menuitem"
      onClick={onSelect}
      className="flex min-h-12 items-center rounded-xl px-4 py-3 text-sm font-medium text-zinc-800 no-underline transition-colors hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none"
    >
      {label}
    </a>
  );
}

export function FloatingSupportWidget() {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const showBale = siteConfig.baleUrl.length > 0;

  return (
    <div
      ref={rootRef}
      className="fixed inset-inline-end-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:inset-inline-end-6 sm:bottom-6"
    >
      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="راه‌های پیام‌رسانی"
          className="w-[min(100vw-2rem,16rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white py-1 shadow-xl"
        >
          <p className="border-b border-zinc-100 px-4 py-2 text-xs font-medium text-zinc-500">
            ارسال پیام
          </p>
          <MenuLink
            href={siteConfig.whatsappUrl}
            label="واتساپ"
            onSelect={closeMenu}
          />
          <MenuLink
            href={siteConfig.telegramUrl}
            label="تلگرام"
            onSelect={closeMenu}
          />
          {showBale ? (
            <MenuLink
              href={siteConfig.baleUrl}
              label="بله"
              onSelect={closeMenu}
            />
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={`${fabClass} bg-zinc-800 shadow-zinc-900/25 hover:bg-zinc-900 focus-visible:outline-zinc-800`}
        title="ارسال پیام"
      >
        <span className="sr-only">ارسال پیام — واتساپ، تلگرام</span>
        <ChatIcon className="h-7 w-7" />
      </button>

      <a
        href={`tel:${siteConfig.phoneTel}`}
        className={`${fabClass} bg-emerald-600 shadow-emerald-900/20 hover:bg-emerald-700 focus-visible:outline-emerald-600`}
        aria-label={`تماس تلفنی — ${siteConfig.phoneDisplay}`}
        title={`تماس: ${siteConfig.phoneDisplay}`}
      >
        <span className="sr-only">
          تماس تلفنی، شماره {siteConfig.phoneDisplay}
        </span>
        <PhoneIcon className="h-7 w-7" />
      </a>
    </div>
  );
}

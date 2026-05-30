/**
 * تنظیمات سایت — بعداً می‌توان از env یا CMS خواند.
 * شماره نمایشی و لینک tel جدا هستند تا فرمت نمایش آزاد باشد.
 */
const WHATSAPP_MESSAGE =
  "سلام، برای مشاوره حقوقی از سایت لاوین پیام می‌دهم";

export const siteConfig = {
  /** برای لینک tel: فقط ارقام و + */
  phoneTel: "+989122401423",
  /** متن نمایشی در UI */
  phoneDisplay: "۰۹۱۲ ۲۴۰ ۱۴۲۳",
  whatsappUrl: `https://wa.me/989122401423?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  telegramUrl: "https://t.me/+989122401423",
  /** خالی = دکمهٔ بله در ویجت نمایش داده نمی‌شود */
  baleUrl: "",
  siteName: "لاوین",
  contactEmail: "example@lawwin.ir",
  contactFormActive: false,
} as const;

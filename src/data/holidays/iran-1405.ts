import type { HolidayYearDataset } from "./types";
import { buildHoliday } from "./buildHoliday";

/**
 * تعطیلات رسمی ایران — سال ۱۴۰۵ (شمسی).
 * منبع: تقویم رسمی ۱۴۰۵ (PDF بارگذاری‌شده).
 * دادهٔ ثابت و محلی — بدون time.ir یا API خارجی.
 */
export const iran1405: HolidayYearDataset = {
  year: 1405,
  source: "curated",
  editorialNote:
    "استخراج‌شده از تقویم رسمی ۱۴۰۵ (PDF). پنج‌شنبه و جمعه در موتور محاسبه جداگانه لحاظ می‌شوند.",
  holidays: [
    // فروردین
    buildHoliday(1405, "1405-eid-fitr-1", "1405-01-01", "عید سعید فطر"),
    buildHoliday(
      1405,
      "1405-eid-fitr-2",
      "1405-01-02",
      "عید سعید فطر",
      "روز دوم (تناسب ۲ روز)",
    ),
    buildHoliday(1405, "1405-nowruz-1", "1405-01-03", "عید نوروز"),
    buildHoliday(1405, "1405-nowruz-2", "1405-01-04", "عید نوروز"),
    buildHoliday(
      1405,
      "1405-islamic-republic",
      "1405-01-12",
      "روز جمهوری اسلامی ایران",
    ),
    buildHoliday(1405, "1405-nature-day", "1405-01-13", "روز طبیعت"),
    buildHoliday(
      1405,
      "1405-martyrdom-imam-sadiq",
      "1405-01-25",
      "شهادت امام جعفر صادق (ع)",
    ),

    // خرداد
    buildHoliday(1405, "1405-eid-adha", "1405-03-06", "عید قربان"),
    buildHoliday(
      1405,
      "1405-death-imam-khomeini",
      "1405-03-14",
      "رحلت حضرت امام خمینی (ره)",
    ),
    buildHoliday(
      1405,
      "1405-uprising-khomeini",
      "1405-03-15",
      "قیام ۱۵ خرداد",
    ),

    // تیر
    buildHoliday(1405, "1405-mid-shaaban-1", "1405-04-03", "نیمه شعبان"),
    buildHoliday(
      1405,
      "1405-mid-shaaban-2",
      "1405-04-04",
      "نیمه شعبان",
      "روز دوم",
    ),

    // مرداد
    buildHoliday(
      1405,
      "1405-martyrdom-imam-ali",
      "1405-05-13",
      "شهادت امام علی (ع)",
    ),
    buildHoliday(
      1405,
      "1405-demise-imam-hassan",
      "1405-05-21",
      "رحلت امام حسن مجتبی (ع)",
    ),
    buildHoliday(
      1405,
      "1405-martyrdom-imam-hassan",
      "1405-05-22",
      "شهادت امام حسن مجتبی (ع)",
    ),
    buildHoliday(1405, "1405-eid-ghadir", "1405-05-30", "عید غدیر"),

    // شهریور — دو مناسبت در یک روز طبق تقویم رسمی
    buildHoliday(
      1405,
      "1405-shahrivar-08",
      "1405-06-08",
      "ولادت امام جعفر صادق (ع) و شهادت امام رضا (ع)",
    ),

    // آبان
    buildHoliday(
      1405,
      "1405-martyrdom-fatemeh",
      "1405-08-22",
      "شهادت حضرت فاطمه زهرا (س)",
    ),

    // دی
    buildHoliday(
      1405,
      "1405-birth-imam-ali",
      "1405-10-02",
      "ولادت امام علی (ع)",
    ),
    buildHoliday(
      1405,
      "1405-mabath",
      "1405-10-16",
      "مبعث حضرت رسول اکرم (ص)",
    ),

    // بهمن
    buildHoliday(
      1405,
      "1405-demise-fatemeh",
      "1405-11-04",
      "وفات حضرت فاطمه زهرا (س)",
    ),
    buildHoliday(
      1405,
      "1405-revolution-victory",
      "1405-11-22",
      "پیروزی انقلاب اسلامی ایران",
    ),

    // اسفند
    buildHoliday(
      1405,
      "1405-birth-imam-askari",
      "1405-12-09",
      "ولادت امام حسن عسکری (ع)",
    ),
    buildHoliday(1405, "1405-eid-1406-1", "1405-12-19", "عید سعید"),
    buildHoliday(
      1405,
      "1405-eid-1406-2",
      "1405-12-20",
      "عید سعید فطر",
      "تناسب با پایان سال",
    ),
    buildHoliday(
      1405,
      "1405-oil-nationalization",
      "1405-12-29",
      "ملی شدن صنعت نفت ایران",
    ),
  ],
};

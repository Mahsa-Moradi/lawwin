/**
 * نقطهٔ ورود عمومی تعطیلات — دادهٔ محلی سالانه (بدون time.ir).
 * پیاده‌سازی در پوشهٔ `holidays/`.
 */
export {
  holidays,
  getHolidaysForYear,
  getHolidaysForYears,
  getHolidaysForCalculation,
  getHolidayByJalaliDate,
  getHolidayYearDataset,
  getRegisteredHolidayYears,
  holidayYearDatasets,
  iran1404,
  iran1405,
} from "./holidays/index";

export type { HolidayYearDataset } from "./holidays/types";

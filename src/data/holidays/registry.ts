import type { Holiday } from "@/types/deadline";
import { iran1404 } from "./iran-1404";
import { iran1405 } from "./iran-1405";
import type { HolidayYearDataset } from "./types";

/** سال‌هایی که فایل curated دارند — برای ثبت فایل جدید این آرایه را به‌روز کنید. */
export const holidayYearDatasets: readonly HolidayYearDataset[] = [
  iran1404,
  iran1405,
] as const;

const datasetsByYear = new Map<number, HolidayYearDataset>(
  holidayYearDatasets.map((d) => [d.year, d]),
);

export function getHolidayYearDataset(
  year: number,
): HolidayYearDataset | undefined {
  return datasetsByYear.get(year);
}

export function getRegisteredHolidayYears(): readonly number[] {
  return holidayYearDatasets.map((d) => d.year).sort((a, b) => a - b);
}

function assertDatasetConsistency(dataset: HolidayYearDataset): void {
  for (const h of dataset.holidays) {
    if (h.year !== undefined && h.year !== dataset.year) {
      throw new Error(
        `تعطیل ${h.id}: سال رکورد (${h.year}) با سال فایل (${dataset.year}) ناهماهنگ است.`,
      );
    }
    if (!h.jalaliDate.startsWith(String(dataset.year))) {
      throw new Error(
        `تعطیل ${h.id}: تاریخ ${h.jalaliDate} در فایل سال ${dataset.year} نامعتبر است.`,
      );
    }
  }
}

/** ادغام چند سال با بررسی یکتایی id و تاریخ. */
export function mergeHolidayDatasets(
  datasets: readonly HolidayYearDataset[],
): readonly Holiday[] {
  const byId = new Map<string, Holiday>();
  const byDate = new Map<string, Holiday>();

  for (const dataset of datasets) {
    assertDatasetConsistency(dataset);
    for (const h of dataset.holidays) {
      const normalized: Holiday = { ...h, year: dataset.year };
      if (byId.has(normalized.id)) {
        throw new Error(`شناسهٔ تعطیل تکراری: ${normalized.id}`);
      }
      const existingOnDate = byDate.get(normalized.jalaliDate);
      if (existingOnDate && existingOnDate.id !== normalized.id) {
        throw new Error(
          `تاریخ تعطیل تکراری ${normalized.jalaliDate}: ${existingOnDate.id} و ${normalized.id}`,
        );
      }
      byId.set(normalized.id, normalized);
      byDate.set(normalized.jalaliDate, normalized);
    }
  }

  return [...byId.values()].sort((a, b) =>
    a.jalaliDate.localeCompare(b.jalaliDate),
  );
}

/** ساخت برچسب مدت فارسی از آرایهٔ روزها. */
export function buildDurationLabel(durations: readonly number[]): string {
  if (durations.length === 0) return "";
  if (durations.length === 1) return `${durations[0]} روز`;
  return `${durations.join(" + ")} روز`;
}

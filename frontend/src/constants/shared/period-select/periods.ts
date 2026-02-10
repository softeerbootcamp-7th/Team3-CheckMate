// 오늘, 이번주, 이번달, 기간 선택
// 최근 7일, 최근 14일, 최근 30일, 기간 선택
// 최근 8주, 최근 12주, 기간 선택
// 최근 6개월, 최근 12개월, 기간 선택
// 최근 3년, 기간 선택
// 오늘, 기간 선택
// 최근 4주, 기간 선택
// 오늘, 최근 7일, 최근 30일, 기간 선택
// 최근 7일, 최근 14일, 기간 선택

import type { ValueOf } from '@/utils/shared';

// --- DAY / WEEK / MONTH group ---
const DAY_WEEK_MONTH_VALUES = ['오늘', '이번주', '이번달'] as const;
// --- Recent days / weeks / months / years groups ---
const RECENT_DAYS_VALUES = ['최근 7일', '최근 14일', '최근 30일'] as const;
const RECENT_WEEKS_VALUES = ['최근 8주', '최근 12주'] as const;
const RECENT_MONTHS_VALUES = ['최근 6개월', '최근 12개월'] as const;
const RECENT_YEARS_VALUES = ['최근 3년'] as const;

const DAY_WEEK_MONTH = {
  today: DAY_WEEK_MONTH_VALUES[0],
  thisWeek: DAY_WEEK_MONTH_VALUES[1],
  thisMonth: DAY_WEEK_MONTH_VALUES[2],
} as const;

const RECENT_DAYS_7_14_30 = {
  recent7Days: RECENT_DAYS_VALUES[0],
  recent14Days: RECENT_DAYS_VALUES[1],
  recent30Days: RECENT_DAYS_VALUES[2],
} as const;

const RECENT_WEEKS_8_12 = {
  recent8Weeks: RECENT_WEEKS_VALUES[0],
  recent12Weeks: RECENT_WEEKS_VALUES[1],
} as const;

const RECENT_MONTHS_6_12 = {
  recent6Months: RECENT_MONTHS_VALUES[0],
  recent12Months: RECENT_MONTHS_VALUES[1],
} as const;

const RECENT_YEARS_3 = {
  recent3Years: RECENT_YEARS_VALUES[0],
} as const;

const TODAY_ONLY = {
  today: DAY_WEEK_MONTH_VALUES[0],
} as const;

const RECENT_4W = {
  recent4Weeks: '최근 4주',
} as const;

const TODAY_7_30 = {
  today: DAY_WEEK_MONTH_VALUES[0],
  recent7Days: RECENT_DAYS_VALUES[0],
  recent30Days: RECENT_DAYS_VALUES[2],
} as const;

const RECENT_7_14 = {
  recent7Days: RECENT_DAYS_VALUES[0],
  recent14Days: RECENT_DAYS_VALUES[1],
} as const;

// --- Combined helper groups ---
export const PERIOD_PRESETS = {
  dayWeekMonth: DAY_WEEK_MONTH,
  recentDays7_14_30: RECENT_DAYS_7_14_30,
  recentWeeks8_12: RECENT_WEEKS_8_12,
  recentMonths6_12: RECENT_MONTHS_6_12,
  recentYears3: RECENT_YEARS_3,
  todayOnly: TODAY_ONLY,
  recent4W: RECENT_4W,
  today7_30: TODAY_7_30,
  recent7_14: RECENT_7_14,
} as const;

export type PeriodPresetType = keyof typeof PERIOD_PRESETS;
// 'dayWeekMonth' | 'recentDays7_14_30' ...
export const PERIOD_PRESET_KEYS = Object.fromEntries(
  Object.keys(PERIOD_PRESETS).map((key) => [key, key]),
) as { [K in PeriodPresetType]: K };
//  dayWeekMonth: "dayWeekMonth", ...

export type PeriodType<T extends PeriodPresetType> = ValueOf<
  (typeof PERIOD_PRESETS)[T]
>;
// PeriodType<'dayWeekMonth'> = "오늘" | "이번주" | "이번달"

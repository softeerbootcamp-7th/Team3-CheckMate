// 시간 상수 정의
const ONE_SECOND_IN_MS = 1000;
const ONE_MINUTE_IN_MS = 60 * ONE_SECOND_IN_MS;
const ONE_HOUR_IN_MS = 60 * ONE_MINUTE_IN_MS;
const ONE_DAY_IN_MS = 24 * ONE_HOUR_IN_MS;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

const TIME_UNITS = [
  { unit: 'second', ms: ONE_SECOND_IN_MS, max: ONE_MINUTE_IN_MS },
  { unit: 'minute', ms: ONE_MINUTE_IN_MS, max: ONE_HOUR_IN_MS },
  { unit: 'hour', ms: ONE_HOUR_IN_MS, max: ONE_DAY_IN_MS },
  { unit: 'day', ms: ONE_DAY_IN_MS, max: ONE_MONTH_IN_MS },
];

const rtfKo = new Intl.RelativeTimeFormat('ko-KR', { numeric: 'auto' });

export const formatRelativeTime = (date: Date | null | undefined): string => {
  if (!date) {
    return '';
  }

  const elapsed = date.getTime() - Date.now();
  const absElapsed = Math.abs(elapsed);

  for (const t of TIME_UNITS) {
    if (absElapsed < t.max) {
      return rtfKo.format(
        Math.round(elapsed / t.ms),
        t.unit as Intl.RelativeTimeFormatUnit,
      );
    }
  }
  // 30일 이상인 경우 기본날짜형식
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

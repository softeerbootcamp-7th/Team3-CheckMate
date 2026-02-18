export const dailyReportKeys = {
  all: ['dailyReport'] as const,
  content: (date: string) => [...dailyReportKeys.all, 'content', date] as const,
  calendar: (year: number, month: number) =>
    [...dailyReportKeys.all, 'calendar', year, month] as const,
};

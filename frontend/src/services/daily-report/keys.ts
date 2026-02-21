export const dailyReportKeys = {
  all: ['dailyReport'] as const,
  content: (date: string) => [...dailyReportKeys.all, 'content', date] as const,
  calendar: (year: number, month: number) =>
    [...dailyReportKeys.all, 'calendar', year, month] as const,
};

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  existsUnread: () =>
    [...notificationKeys.all, 'list', 'exists-unread'] as const,
  closingTime: () => [...notificationKeys.all, 'closing-time'] as const,
};

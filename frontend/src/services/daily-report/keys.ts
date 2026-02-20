export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  existsUnread: () =>
    [...notificationKeys.all, 'list', 'exists-unread'] as const,
  closingTime: () => [...notificationKeys.all, 'closing-time'] as const,
};

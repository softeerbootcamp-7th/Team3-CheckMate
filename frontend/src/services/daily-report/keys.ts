export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  existsUnread: () => [...notificationKeys.all, 'exists-unread'] as const,
};

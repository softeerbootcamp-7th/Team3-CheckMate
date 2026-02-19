import type { Notification } from '@/types/daily-report';

export const NOTIFICATION_DATA: Notification[] = [
  {
    notificationId: '1',
    content: '1월 14일 하루 리포트가 발행되었습니다.',
    createdAt: '2026-02-09T05:00:00Z',
    isRead: false,
  },
  {
    notificationId: '2',
    content: '1월 14일 하루 리포트가 발행되었습니다.',
    createdAt: '2026-02-07T15:00:00Z',
    isRead: true,
  },
  {
    notificationId: '3',
    content: '1월 14일 하루 리포트가 발행되었습니다.',
    createdAt: '2024-05-31T16:45:00Z',
    isRead: false,
  },
];

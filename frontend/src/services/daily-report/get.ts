import type {
  GetExistsUnreadNotificationResponseDto,
  GetNotificationListResponseDto,
} from '@/types/daily-report';

import { authorizedApi } from '../shared';

/** 미열람 알림 존재 여부 확인 (polling) */
export const getExistsUnreadNotification = async () => {
  const { data } =
    await authorizedApi.get<GetExistsUnreadNotificationResponseDto>(
      '/api/notifications/unread-status',
    );

  return data;
};

export const getNotificationList = async () => {
  const { data } =
    await authorizedApi.get<GetNotificationListResponseDto>(
      '/api/notifications',
    );

  return data;
};

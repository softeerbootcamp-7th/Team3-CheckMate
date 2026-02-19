import type {
  GetExistsUnreadNotificationResponseDto,
  GetNextClosingTimeResponseDto,
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

/** 알림 목록 조회 */
export const getNotificationList = async () => {
  const { data } =
    await authorizedApi.get<GetNotificationListResponseDto>(
      '/api/notifications',
    );

  return data;
};

/** 알림 시간 조회 (알림 조회 polling을 시작할 시간) */
export const getNextClosingTime = async () => {
  const { data } = await authorizedApi.get<GetNextClosingTimeResponseDto>(
    '/api/stores/closing-time',
  );
  return data;
};

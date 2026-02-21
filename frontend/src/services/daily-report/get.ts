import type {
  GetDailyReportCalendarQuery,
  GetDailyReportCalendarResponseDto,
  GetDailyReportContentParam,
  GetDailyReportContentResponseDto,
  GetExistsUnreadNotificationResponseDto,
  GetNextClosingTimeResponseDto,
  GetNotificationListResponseDto,
} from '@/types/daily-report';

import { authorizedApi } from '../shared';

/** 하루 리포트 내용 조회 */
export const getDailyReportContent = async (
  param: GetDailyReportContentParam,
) => {
  const { date } = param;

  const { data } = await authorizedApi.get<GetDailyReportContentResponseDto>(
    `/api/reports/${date}`,
  );

  return data ?? null;
};

/** 캘린더 월별 매출 데이터 조회 */
export const getDailyReportCalendar = async (
  query: GetDailyReportCalendarQuery,
) => {
  const queryParams = new URLSearchParams({
    month: query.month.toString(),
    year: query.year.toString(),
  }).toString();

  const { data } = await authorizedApi.get<GetDailyReportCalendarResponseDto>(
    `/api/reports/calendar?${queryParams}`,
  );

  return data;
};

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

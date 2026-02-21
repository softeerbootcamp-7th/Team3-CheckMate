import type {
  GetDailyReportCalendarQuery,
  GetDailyReportCalendarResponseDto,
  GetDailyReportContentParam,
  GetDailyReportContentResponseDto,
} from '@/types/daily-report';

import { authorizedApi } from '../shared';

export const getDailyReportContent = async (
  param: GetDailyReportContentParam,
) => {
  const { date } = param;

  const { data } = await authorizedApi.get<GetDailyReportContentResponseDto>(
    `/api/reports/${date}`,
  );

  return data;
};
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

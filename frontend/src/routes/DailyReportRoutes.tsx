import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';

const DailyReportPage = lazy(
  () => import('@/pages/daily-report-page/DailyReportPage'),
);

export const dailyReportRoutes: RouteObject = {
  path: ROUTE_PATHS.DAILY_REPORT,
  Component: DailyReportPage,
};

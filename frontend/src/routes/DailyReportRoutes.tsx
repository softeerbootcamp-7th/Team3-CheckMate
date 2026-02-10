import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { DailyReportPage } from '@/pages/daily-report-page';

export const dailyReportRoutes: RouteObject = {
  path: ROUTE_PATHS.DAILY_REPORT,
  Component: DailyReportPage,
};

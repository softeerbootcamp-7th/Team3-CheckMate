import type { RouteObject } from 'react-router-dom';

import { DailyReportPage } from '@/pages/daily-report-page';

export const dailyReportRoutes: RouteObject = {
  path: 'daily-report',
  Component: DailyReportPage,
};

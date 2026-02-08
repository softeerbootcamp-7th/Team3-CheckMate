import { type RouteObject } from 'react-router-dom';

import { MainLayout, Spinner } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';
import { mainPageLoader } from '@/pages/main-page';
import { queryClient } from '@/services/shared';

import { analysisRoutes } from './AnalysisRoutes';
import { dailyReportRoutes } from './DailyReportRoutes';
import { dashboardRoutes } from './DashboardRoutes';
import { settingRoutes } from './SettingRoutes';

export const mainPageRoutes: RouteObject = {
  path: ROUTE_PATHS.MAIN,
  Component: MainLayout,
  loader: mainPageLoader(queryClient),
  hydrateFallbackElement: <Spinner className="text-brand-main size-5" />,
  children: [dashboardRoutes, analysisRoutes, dailyReportRoutes, settingRoutes],
};

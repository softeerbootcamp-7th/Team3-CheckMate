import { Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';

import { MainLayout } from '@/components/shared';
import { ROUTE_PATHS } from '@/constants/shared';
import { mainPageLoader, MainPageLoadingFallback } from '@/pages/main-page';
import { queryClient } from '@/services/shared';

import { analysisRoutes } from './AnalysisRoutes';
import { dailyReportRoutes } from './DailyReportRoutes';
import { dashboardRoutes } from './DashboardRoutes';
import { settingRoutes } from './SettingRoutes';

export const mainPageRoutes: RouteObject = {
  path: ROUTE_PATHS.MAIN,
  Component: () => (
    <Suspense fallback={<MainPageLoadingFallback />}>
      <MainLayout />
    </Suspense>
  ),
  loader: mainPageLoader(queryClient),
  hydrateFallbackElement: <MainPageLoadingFallback />,
  children: [dashboardRoutes, analysisRoutes, dailyReportRoutes, settingRoutes],
};

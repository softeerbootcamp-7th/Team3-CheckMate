import { type RouteObject } from 'react-router-dom';

import { MainLayout } from '@/components/shared';

import { analysisRoutes } from './analysisRoutes';
import { dailyReportRoutes } from './dailyReportRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { settingRoutes } from './settingRoutes';

export const mainPageRoutes: RouteObject = {
  path: '/',
  Component: MainLayout,
  children: [dashboardRoutes, analysisRoutes, dailyReportRoutes, settingRoutes],
};

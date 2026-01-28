import { type RouteObject } from 'react-router-dom';

import { MainLayout } from '@/components/shared';

import { analysisRoutes } from './AnalysisRoutes';
import { dailyReportRoutes } from './DailyReportRoutes';
import { dashboardRoutes } from './DashboardRoutes';
import { settingRoutes } from './SettingRoutes';

export const mainPageRoutes: RouteObject = {
  path: '',
  Component: MainLayout,
  children: [dashboardRoutes, analysisRoutes, dailyReportRoutes, settingRoutes],
};

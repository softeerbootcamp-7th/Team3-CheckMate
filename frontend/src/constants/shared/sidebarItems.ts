import {
  AnalysisIcon,
  DailyReportIcon,
  DashboardIcon,
  SettingsIcon,
} from '@/assets';
import type { SidebarItem } from '@/types/shared';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'DASHBOARD',
    name: '대시보드',
    path: '/dashboard',
    Icon: DashboardIcon,
  },
  {
    id: 'ANALYSIS',
    name: '상세분석',
    path: '/analysis',
    Icon: AnalysisIcon,
    subMenus: [
      {
        id: 'ANALYSIS_SALES',
        name: '매출분석',
        path: '/analysis/sales',
      },
      {
        id: 'ANALYSIS_MENU',
        name: '메뉴분석',
        path: '/analysis/menu',
      },
      {
        id: 'ANALYSIS_WEATHER',
        name: '날씨분석',
        path: '/analysis/weather',
      },
    ],
  },

  {
    id: 'DAILY_REPORT',
    name: '하루리포트',
    path: '/daily-report',
    Icon: DailyReportIcon,
  },
  { id: 'SETTINGS', name: '환경설정', path: '/settings', Icon: SettingsIcon },
];

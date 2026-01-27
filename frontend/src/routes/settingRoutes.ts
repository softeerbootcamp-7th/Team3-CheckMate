import type { RouteObject } from 'react-router-dom';

import { SettingPage } from '@/pages/setting-page';

export const settingRoutes: RouteObject = {
  path: '/settings',
  Component: SettingPage,
};

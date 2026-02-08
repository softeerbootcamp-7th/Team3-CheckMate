import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { SettingPage } from '@/pages/setting-page';

export const settingRoutes: RouteObject = {
  path: ROUTE_PATHS.SETTINGS,
  Component: SettingPage,
};

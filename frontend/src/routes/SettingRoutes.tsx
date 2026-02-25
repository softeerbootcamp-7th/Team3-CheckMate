import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';

const SettingPage = lazy(() => import('@/pages/setting-page/SettingPage'));
const IngredientPage = lazy(
  () => import('@/pages/ingredient-page/IngredientPage'),
);

export const settingRoutes: RouteObject = {
  path: ROUTE_PATHS.SETTINGS.BASE,
  children: [
    {
      Component: SettingPage,
      index: true,
    },
    {
      path: ROUTE_PATHS.SETTINGS.INGREDIENT,
      Component: IngredientPage,
    },
  ],
};

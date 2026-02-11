import { type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { IngredientPage } from '@/pages/ingredient-page';
import { SettingPage } from '@/pages/setting-page';

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

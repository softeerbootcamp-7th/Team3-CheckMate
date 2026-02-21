import { Navigate, type RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { MenuPage } from '@/pages/menu-page';
import { SalesPage } from '@/pages/sales-page';
import { WeatherPage } from '@/pages/weather-page';

export const analysisRoutes: RouteObject = {
  path: ROUTE_PATHS.ANALYSIS.BASE,
  children: [
    {
      index: true,
      element: <Navigate to={ROUTE_PATHS.ANALYSIS.SALES} replace />,
    },
    { path: ROUTE_PATHS.ANALYSIS.SALES, Component: SalesPage },
    {
      path: ROUTE_PATHS.ANALYSIS.MENU,
      children: [
        {
          index: true,
          Component: MenuPage,
        },
        // {
        //   path: ROUTE_PATHS.ANALYSIS.MENU_SALES_RANK,
        //   Component: MenuSalesRankPage,
        // },
        // {
        //   path: ROUTE_PATHS.ANALYSIS.INGREDIENT_CONSUMPTION_RANK,
        //   Component: IngredientConsumptionRankPage,
        // },
      ],
    },
    { path: ROUTE_PATHS.ANALYSIS.WEATHER, Component: WeatherPage },
  ],
};

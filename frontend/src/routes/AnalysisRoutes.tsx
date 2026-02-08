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
      element: <Navigate to="sales" replace />,
    },
    { path: ROUTE_PATHS.ANALYSIS.SALES, Component: SalesPage },
    { path: ROUTE_PATHS.ANALYSIS.MENU, Component: MenuPage },
    { path: ROUTE_PATHS.ANALYSIS.WEATHER, Component: WeatherPage },
  ],
};

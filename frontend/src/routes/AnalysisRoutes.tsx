import { Navigate, type RouteObject } from 'react-router-dom';

import { MenuPage } from '@/pages/menu-page';
import { SalesPage } from '@/pages/sales-page';
import { WeatherPage } from '@/pages/weather-page';

export const analysisRoutes: RouteObject = {
  path: '/analysis',
  children: [
    {
      index: true,
      element: <Navigate to="sales" replace />,
    },
    { path: 'sales', Component: SalesPage },
    { path: 'menu', Component: MenuPage },
    { path: 'weather', Component: WeatherPage },
  ],
};

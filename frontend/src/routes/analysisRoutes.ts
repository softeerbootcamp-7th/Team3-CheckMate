import type { RouteObject } from 'react-router-dom';

import { MenuPage } from '@/pages/menu-page';
import { SalesPage } from '@/pages/sales-page';
import { WeatherPage } from '@/pages/weather-page';

export const analysisRoutes: RouteObject = {
  path: '/analysis',
  children: [
    { path: 'sales', Component: SalesPage },
    { path: 'menu', Component: MenuPage },
    { path: 'weather', Component: WeatherPage },
  ],
};

import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { PrivacyPage } from '@/pages/privacy-page';

export const privacyRoutes: RouteObject = {
  path: ROUTE_PATHS.PRIVACY,
  Component: PrivacyPage,
};

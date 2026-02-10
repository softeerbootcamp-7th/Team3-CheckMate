import type { RouteObject } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';
import { TermsPage } from '@/pages/terms-page';

export const termsRoutes: RouteObject = {
  path: ROUTE_PATHS.TERMS,
  Component: TermsPage,
};

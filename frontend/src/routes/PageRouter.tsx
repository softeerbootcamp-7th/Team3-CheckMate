import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { rootRoutes } from './RootRoutes';

const router = createBrowserRouter([rootRoutes]);

export const PageRouter = () => {
  return <RouterProvider router={router} />;
};

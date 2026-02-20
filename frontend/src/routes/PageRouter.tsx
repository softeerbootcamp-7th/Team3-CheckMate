import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { rootRoutes } from './RootRoutes';

if (import.meta.env.MODE === 'development') {
  const { worker } = await import('../mocks/browser.ts');
  await worker.start();
}

const router = createBrowserRouter([rootRoutes]);

export const PageRouter = () => {
  return <RouterProvider router={router} />;
};

import { Outlet, type UIMatch, useMatches } from 'react-router-dom';

import type { RouteHandle } from '@/types/shared';

import { Sidebar } from '../sidebar';

/**
 * 전역 페이지 레이아웃을 정의하는 컴포넌트
 * 사이드바와 각 페이지(Outlet)을 배치
 */
export const MainLayout = () => {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

  return (
    <div className="flex h-screen w-full">
      {!matches.some((m) => m.handle && m.handle.hideSidebar) && <Sidebar />}
      <main className="bg-special-dashboard-bg flex flex-1 justify-center-safe overflow-x-scroll overflow-y-scroll">
        <div className="mx-10 w-265">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

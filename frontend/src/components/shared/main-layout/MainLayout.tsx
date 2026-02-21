import { useRef } from 'react';
import { Outlet, type UIMatch, useMatches } from 'react-router-dom';

import { NotificationPollingStarter } from '@/components/shared';
import type { RouteHandle } from '@/types/shared';
import { cn } from '@/utils/shared';

import { Sidebar } from '../sidebar';

/**
 * 전역 페이지 레이아웃을 정의하는 컴포넌트
 * 사이드바와 각 페이지(Outlet)을 배치
 */
export const MainLayout = () => {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];
  const hideSidebar = matches.some((m) => m.handle && m.handle.hideSidebar);

  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex h-screen w-full">
      {/* 알림 API 폴링 */}
      <NotificationPollingStarter />

      {!hideSidebar && <Sidebar />}
      <main
        ref={mainRef}
        className="bg-special-dashboard-bg flex flex-1 justify-center-safe overflow-x-auto overflow-y-auto"
      >
        <div className={cn(hideSidebar ? 'w-full' : 'mx-10 w-265')}>
          <Outlet context={{ mainRef }} />
        </div>
      </main>
    </div>
  );
};

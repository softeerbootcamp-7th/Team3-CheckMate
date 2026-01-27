import { Outlet } from 'react-router-dom';

import { Sidebar } from '../sidebar';

/**
 * 전역 페이지 레이아웃을 정의하는 컴포넌트
 * 사이드바와 각 페이지(Outlet)을 배치
 */
export const MainLayout = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <main className="bg-special-dashboard-bg flex-1">
        <Outlet />
      </main>
    </div>
  );
};

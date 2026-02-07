import { useLocation, useNavigate } from 'react-router-dom';

import { ChatSheet } from '@/components/ai-chat';
import { Button } from '@/components/shared/shadcn-ui';
import { SIDEBAR_ITEMS } from '@/constants/shared';
import type { SidebarOptionItem } from '@/types/shared';
import { cn } from '@/utils/shared/lib/utils';

export const Sidebar = () => {
  // 현재 브라우저의 URL 경로를 가져옴
  const { pathname } = useLocation();
  // 페이지 이동을 위한 네비게이션 함수
  const navigate = useNavigate();

  return (
    <aside className="bg-grey-0 h-full w-75 shrink-0">
      <img
        src="/assets/logoWithTitle.svg"
        alt="Logo"
        className="mx-auto mt-21 ml-[40px] h-16.5 w-41"
      />
      <div className="mt-11.75 ml-7.25 flex w-55 flex-col gap-100">
        {SIDEBAR_ITEMS.map((menu: SidebarOptionItem) => {
          // 선택된 버튼인지를 현재 url 경로와 비교하여 판단
          const isActive = pathname.startsWith(menu.path);

          return (
            <ul key={menu.id}>
              {/* 각 메뉴 선택 버튼(대시보드, 상세분석, 하루리포트, 환경설정)  */}
              <Button
                onClick={() => navigate(menu.path)}
                className={cn(
                  isActive
                    ? 'text-brand-main body-medium-bold! bg-brand-20'
                    : 'body-medium-medium! text-gray-600',

                  `rounded-150 flex h-[40px] w-full cursor-pointer items-center justify-start gap-[6px]`,
                )}
              >
                {menu.Icon && (
                  <menu.Icon
                    className={cn(
                      isActive ? 'text-brand-400' : 'text-gray-600',
                      'size-5.5',
                    )}
                  />
                )}
                <span className="mt-[2px]">{menu.name}</span>
              </Button>
              {/* 상세분석은 하위 메뉴 버튼들이 있음. 해당 버튼들 출력해야함 */}
              {menu.subMenus && (
                <ul className="flex flex-col">
                  {menu.subMenus.map((sub: SidebarOptionItem) => {
                    // 하위 메뉴는 경로가 정확히 일치해야 활성화 표시
                    // /analysis/sales, /analysis/menu 등
                    const isSubActive = pathname.includes(sub.path);

                    return (
                      <Button
                        key={sub.id}
                        onClick={() => navigate(sub.path)}
                        className={cn(
                          isSubActive
                            ? 'text-brand-main body-medium-bold!'
                            : 'body-medium-medium! text-gray-400',

                          `flex h-[40px] w-full cursor-pointer items-center justify-start pl-[36px]`,
                        )}
                      >
                        <span>{sub.name}</span>
                      </Button>
                    );
                  })}
                </ul>
              )}
            </ul>
          );
        })}
        <ChatSheet />
      </div>
    </aside>
  );
};

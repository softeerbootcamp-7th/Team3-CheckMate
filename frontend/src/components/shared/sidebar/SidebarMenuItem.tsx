import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { Badge } from '@/components/shared';
import type { SidebarOptionItem } from '@/types/shared/sidebarOptionItem';
import { cn } from '@/utils/shared';

import { SidebarSubmenuItem } from './SidebarSubmenuItem';

interface SidebarMenuItemProps {
  menu: SidebarOptionItem;
}
export const SidebarMenuItem = memo(({ menu }: SidebarMenuItemProps) => {
  return (
    <li>
      {/* 각 메뉴 선택 버튼(대시보드, 상세분석, 하루리포트, 환경설정)  */}
      <NavLink
        className={({ isActive }) =>
          cn(
            isActive
              ? 'text-brand-main body-medium-bold! bg-brand-20 [:svg]:text-brand-400'
              : 'body-medium-medium! [:svg]:text-grey-600 text-grey-600',

            `rounded-150 flex h-[40px] w-full cursor-pointer items-center justify-start gap-[6px] px-200 [:svg]:size-5.5`,
          )
        }
        to={menu.path}
      >
        {/* TODO 알림 존재 여부 패칭해올 것 */}
        <Badge show={menu.id === 'DAILY_REPORT'} position="top-left">
          {menu.Icon && <menu.Icon />}
        </Badge>
        <span className="mt-[2px]">{menu.name}</span>
      </NavLink>

      {/* 상세분석 하위 메뉴 */}
      {menu.subMenus && (
        <ul className="flex flex-col">
          {menu.subMenus.map((sub: SidebarOptionItem) => (
            <SidebarSubmenuItem key={sub.id} sub={sub} />
          ))}
        </ul>
      )}
    </li>
  );
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

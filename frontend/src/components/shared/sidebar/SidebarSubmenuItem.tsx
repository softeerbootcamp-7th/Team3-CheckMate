import { NavLink } from 'react-router-dom';

import type { SidebarOptionItem } from '@/types/shared';
import { cn } from '@/utils/shared';

interface SidebarSubmenuItemProps {
  sub: SidebarOptionItem;
}
export const SidebarSubmenuItem = ({ sub }: SidebarSubmenuItemProps) => {
  // 하위 메뉴는 경로가 정확히 일치해야 활성화 표시
  // /analysis/sales, /analysis/menu 등
  return (
    <NavLink
      key={sub.id}
      className={({ isActive }) =>
        cn(
          isActive
            ? 'text-brand-main body-medium-bold!'
            : 'body-medium-medium! text-gray-400',

          `flex h-[40px] w-full cursor-pointer items-center justify-start pl-[36px]`,
        )
      }
      to={sub.path}
    >
      <span>{sub.name}</span>
    </NavLink>
  );
};

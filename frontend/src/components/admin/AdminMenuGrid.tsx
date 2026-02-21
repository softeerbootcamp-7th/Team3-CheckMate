import type { Menu } from '@/types/menu';
import { cn, formatNumber } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';

interface AdminMenuGridProps {
  menuList: Menu[];
  orderMenus: { menuId: Menu['menuId']; quantity: number }[];
  onMenuClick: (menuId: number) => void;
}

export const AdminMenuGrid = ({
  menuList,
  orderMenus,
  onMenuClick,
}: AdminMenuGridProps) => {
  return (
    <div className="bg-grey-200 min-h-0 flex-1 p-4">
      <div className="grid h-full auto-rows-[270px] grid-cols-3 gap-4 overflow-y-auto pr-2 xl:grid-cols-4">
        {menuList.map((menu) => {
          const isSelected = orderMenus.some(
            (orderItem) => orderItem.menuId === menu.menuId,
          );

          return (
            <Button
              key={menu.menuId}
              type="button"
              variant="default"
              onClick={() => {
                onMenuClick(menu.menuId);
              }}
              className={cn(
                'rounded-400 border-grey-200 bg-grey-100 text-grey-700 hover:border-brand-300 flex size-full! flex-col items-center justify-center border text-center transition-colors',
                isSelected && 'border-brand-main bg-brand-20 text-grey-900',
              )}
            >
              <p className="title-small font-semibold">{menu.name}</p>
              <p className="body-large-medium text-grey-500 mt-2">
                {formatNumber(menu.price)}원
              </p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

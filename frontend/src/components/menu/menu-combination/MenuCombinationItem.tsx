import { RankBadge } from '@/components/shared';
import type { PairedMenu } from '@/types/menu';
import { formatNumber } from '@/utils/shared';

interface MenuCombinationItemProps {
  rank: number;
  menuName: PairedMenu['menuName'];
  count: PairedMenu['count'];
  isHighlight: boolean;
}

export const MenuCombinationItem = ({
  rank,
  menuName,
  count,
  isHighlight,
}: MenuCombinationItemProps) => {
  return (
    <li className="rounded-200 bg-grey-50 flex items-center gap-3 p-200">
      <RankBadge
        rank={rank}
        size="sm"
        variant={isHighlight ? 'highlight' : 'default'}
        className="size-7 shrink-0"
      />
      <span className="body-medium-semibold text-grey-900 grow truncate">
        {menuName}
      </span>
      <div className="flex w-35 shrink-0 items-center justify-end gap-1">
        <span className="text-grey-900 body-medium-semibold truncate">
          {formatNumber(count)}
        </span>
        <span className="text-grey-500 body-medium-medium">회</span>
      </div>
    </li>
  );
};

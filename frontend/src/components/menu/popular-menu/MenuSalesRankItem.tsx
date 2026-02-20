import { RankBadge } from '@/components/shared';
import { MENU_SALES_RANK } from '@/constants/menu';
import type { MenuSales } from '@/types/menu';
import { formatNumber } from '@/utils/shared';

interface MenuSalesRankItemProps {
  rank: number;
  menuName: MenuSales['menuName'];
  totalSalesAmount: MenuSales['totalSalesAmount'];
  totalOrderCount: MenuSales['orderCount'];
}

export const MenuSalesRankItem = ({
  rank,
  menuName,
  totalSalesAmount,
  totalOrderCount,
}: MenuSalesRankItemProps) => {
  const {
    HIGHLIGHT_RANK_THRESHOLD,
    TOTAL_SALES_AMOUNT_UNIT,
    TOTAL_ORDER_COUNT_UNIT,
  } = MENU_SALES_RANK;
  const isHighlight = rank <= HIGHLIGHT_RANK_THRESHOLD;

  return (
    <tr>
      <td>
        <RankBadge
          rank={rank}
          size="sm"
          variant={isHighlight ? 'highlight' : 'default'}
          className="shrink-0"
        />
      </td>
      <td className="body-medium-semibold w-20 max-w-20 truncate">
        {menuName}
      </td>
      <td className="text-grey-900 text-end">
        <span className="truncate">{formatNumber(totalSalesAmount)}</span>
        <span>{TOTAL_SALES_AMOUNT_UNIT}</span>
      </td>
      <td className="text-grey-600 w-full">
        <div className="flex items-center justify-end pl-3">
          <span className="block min-w-0 truncate">
            {formatNumber(totalOrderCount)}
          </span>
          {TOTAL_ORDER_COUNT_UNIT}
        </div>
      </td>
    </tr>
  );
};

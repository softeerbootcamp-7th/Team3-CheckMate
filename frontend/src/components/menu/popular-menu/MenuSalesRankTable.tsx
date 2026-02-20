import { useMenuSalesRank } from '@/hooks/menu';

import { MenuSalesRankingCardContentEmptyView } from '../shared';

import { MenuSalesRankItem } from './MenuSalesRankItem';
import { usePopularMenuPeriodType } from './period-type-provider';

export const MenuSalesRankTable = () => {
  const { periodType, startDate, endDate } = usePopularMenuPeriodType();

  const { cardCode, displayedRankItems } = useMenuSalesRank({
    periodType,
    startDate,
    endDate,
  });

  if (displayedRankItems.length === 0) {
    return <MenuSalesRankingCardContentEmptyView cardCode={cardCode} />;
  }

  return (
    <table className="w-full table-fixed border-separate border-spacing-y-3 overflow-y-auto p-0">
      {/* table-fixed 때문에 colgroup을 통해 각 열의 너비 조정 */}
      <colgroup>
        <col className="w-9" />
        <col className="w-40" />
        <col className="w-auto" />
        <col className="w-auto" />
      </colgroup>
      <thead>
        <tr className="sr-only">
          <th>순위</th>
          <th>메뉴명</th>
          <th>매출액</th>
          <th>주문건수</th>
        </tr>
      </thead>
      <tbody>
        {displayedRankItems.map(
          ({ menuName, totalSalesAmount, orderCount }, index) => (
            <MenuSalesRankItem
              key={menuName}
              rank={index + 1}
              menuName={menuName}
              totalSalesAmount={totalSalesAmount}
              totalOrderCount={orderCount}
            />
          ),
        )}
      </tbody>
    </table>
  );
};

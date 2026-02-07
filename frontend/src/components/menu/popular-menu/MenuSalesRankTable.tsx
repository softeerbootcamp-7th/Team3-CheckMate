import { MENU_SALES_RANK } from '@/constants/menu';
import { menuSalesRankItems } from '@/mocks/data/menu';

import { MenuSalesRankItem } from './MenuSalesRankItem';

export const MenuSalesRankTable = () => {
  const displayedRankItems = menuSalesRankItems.slice(
    0,
    MENU_SALES_RANK.MAX_DISPLAYED_RANK_ITEMS,
  );
  return (
    <table className="w-full table-fixed border-separate border-spacing-y-3 overflow-y-auto p-0">
      {/* table-fixed 때문에 colgroup을 통해 각 열의 너비 조정 */}
      <colgroup>
        <col className="w-9" />
        <col className="w-auto" />
        <col className="w-25" />
        <col className="w-20" />
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
          ({ rank, menuName, totalSalesAmount, totalOrderCount }) => (
            <MenuSalesRankItem
              key={rank}
              rank={rank}
              menuName={menuName}
              totalSalesAmount={totalSalesAmount}
              totalOrderCount={totalOrderCount}
            />
          ),
        )}
      </tbody>
    </table>
  );
};

import type { MenuSales } from '@/types/menu';

import { MenuSalesRankItem } from './MenuSalesRankItem';

interface MenuSalesRankTableProps {
  displayedRankItems: MenuSales[];
}

export const MenuSalesRankTable = ({
  displayedRankItems,
}: MenuSalesRankTableProps) => {
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
              key={`${menuName}-${index}`}
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

import type { ReactNode } from 'react';

import type { DashboardRankItem } from '@/types/dashboard/menu';
import { cn } from '@/utils/shared';

import { RankItem } from './RankItem';

interface MenuSalesRankingCardContentProps {
  className?: string;
  children?: ReactNode;
}

export const MenuSalesRankingContent = ({
  className,
  children,
}: MenuSalesRankingCardContentProps) => {
  return (
    <table
      className={cn(
        'w-75 table-fixed border-separate border-spacing-x-3 border-spacing-y-2',
        className,
      )}
    >
      <colgroup>
        <col className="w-7" />
        <col className="w-26" />
        <col className="w-auto" />
      </colgroup>
      <thead>
        <tr className="sr-only">
          <th>순위</th>
          <th>메뉴명</th>
          <th>매출액</th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

interface MenuSalesRankingContentTableBodyProps {
  menuRankItems: DashboardRankItem[];
}
const MenuSalesRankingContentTableBody = ({
  menuRankItems,
}: MenuSalesRankingContentTableBodyProps) => {
  return (
    <tbody>
      {menuRankItems.map(({ rank, itemName, totalAmount, unit }) => (
        <RankItem
          key={rank}
          rank={rank}
          itemName={itemName}
          totalAmount={totalAmount}
          unit={unit}
        />
      ))}
    </tbody>
  );
};

MenuSalesRankingContent.TableBody = MenuSalesRankingContentTableBody;

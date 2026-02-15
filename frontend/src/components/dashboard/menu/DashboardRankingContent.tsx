import type { ReactNode } from 'react';

import type { DashboardRankItem } from '@/types/dashboard/menu';
import { cn } from '@/utils/shared';

import { RankItem } from './RankItem';

interface MenuSalesRankingCardContentProps {
  className?: string;
  children?: ReactNode;
  tHeadLabels?: string[];
}

// 메뉴분석에서 '메뉴 매출 랭킹', '식자재 소진량 랭킹' 카드에서 공통으로 사용하는 순위 컴포넌트
export const DashboardRankingContent = ({
  className,
  children,
  tHeadLabels = ['순위', '메뉴명', '매출액'], // 테이블 각 열의 이름, sr-only 클래스로 화면에서는 보이지 않지만 스크린 리더로 읽을 수 있도록 함
}: MenuSalesRankingCardContentProps) => {
  return (
    <table
      className={cn(
        'w-75 table-fixed border-separate border-spacing-y-2',
        className,
      )}
    >
      <colgroup>
        <col className="w-10" />
        <col className="w-32" />
        <col className="w-auto" />
      </colgroup>
      <thead>
        {/* 테이블 각 열의 이름 지정*/}
        <tr className="sr-only">
          {tHeadLabels.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

interface DashboardRankingContentTableBodyProps {
  rankItems: DashboardRankItem[];
}
const DashboardRankingContentTableBody = ({
  rankItems,
}: DashboardRankingContentTableBodyProps) => {
  return (
    <tbody>
      {rankItems.map(({ rank, itemName, totalAmount, unit }) => (
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

DashboardRankingContent.TableBody = DashboardRankingContentTableBody;

// 대시보드>메뉴분석에서 메뉴별 매출 랭킹 카드
import { useMemo } from 'react';

import { DASHBOARD_RANKING } from '@/constants/menu';
import type { DashboardRankItem } from '@/types//menu';
import type { GetMenuSalesRankingResponseDto, MenuSales } from '@/types/menu';

import { DashboardRankingContent } from './DashboardRankingContent';

// dto를 대시보드의 메뉴 매출 랭킹 카드 UI에서 사용하는 데이터 형태로 변환
interface GetDashboardMenuRankItemsParams {
  items: MenuSales[];
}
const getDashboardMenuRankItems = ({
  items,
}: GetDashboardMenuRankItemsParams): DashboardRankItem[] => {
  return items
    .map((item, index) => ({
      rank: index + 1,
      itemName: item.menuName,
      totalAmount: item.totalSalesAmount,
      unit: '원' as const,
    }))
    .concat(
      Array.from({
        length: Math.max(
          0,
          DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS - items.length,
        ),
      }).map((_, index) => ({
        rank: items.length + index + 1,
        unit: '원' as const,
        ...DASHBOARD_RANKING.EMPTY_RANK_ITEM,
      })),
    )
    .slice(0, DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS);
  // 4등까지 보여줌
};

interface MenuSalesRankingCardContentProps extends GetMenuSalesRankingResponseDto {
  className?: string;
}

export const MenuSalesRankingCardContent = ({
  items,
  className,
}: MenuSalesRankingCardContentProps) => {
  // dto -> 대시보드의 메뉴>매출 랭킹 카드 UI 데이터 형태로 변환
  const menuRankItems = useMemo(
    () => getDashboardMenuRankItems({ items }),
    [items],
  );
  // tHeadLabels를 통해 테이블 각 열의 이름을 지정
  return (
    <DashboardRankingContent
      tHeadLabels={['순위', '메뉴명', '매출액']}
      className={className}
    >
      <DashboardRankingContent.TableBody rankItems={menuRankItems} />
    </DashboardRankingContent>
  );
};

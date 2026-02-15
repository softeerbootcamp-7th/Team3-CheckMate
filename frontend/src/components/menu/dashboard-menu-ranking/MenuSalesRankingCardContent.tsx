// 대시보드>메뉴분석에서 메뉴별 매출 랭킹 카드
import { useMemo } from 'react';

import { DASHBOARD_RANKING } from '@/constants/menu';
import type { DashboardRankItem } from '@/types//menu';
import type {
  GetMenuSalesRankingResponseDto,
  MenuSales,
} from '@/types/menu/dto';

import { DashboardRankingContent } from './DashboardRankingContent';

// dto를 대시보드의 메뉴 매출 랭킹 카드 UI에서 사용하는 데이터 형태로 변환
interface GetDashboardMenuRankItemsParams {
  items: MenuSales[];
}
const getDashboardMenuRankItems = ({
  items,
}: GetDashboardMenuRankItemsParams): DashboardRankItem[] => {
  // 매출액 기준으로 내림차순 정렬
  const sortedItems = [...items].sort(
    (a, b) => b.totalSalesAmount - a.totalSalesAmount,
  );
  return sortedItems
    .map((item, index) => ({
      rank: index + 1,
      itemName: item.menuName,
      totalAmount: item.totalSalesAmount,
      unit: '원' as const,
    }))
    .slice(0, DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS);
  // 최대 4등까지만 보여줌
};

interface MenuSalesRankingCardContentProps extends Omit<
  GetMenuSalesRankingResponseDto,
  'orderCount'
> {
  className?: string;
}

export const MenuSalesRankingCardContent = ({
  items,
}: MenuSalesRankingCardContentProps) => {
  // dto -> 대시보드의 메뉴>매출 랭킹 카드 UI 데이터 형태로 변환
  const menuRankItems = useMemo(
    () => getDashboardMenuRankItems({ items }),
    [items],
  );
  // tHeadLabels를 통해 테이블 각 열의 이름을 지정
  return (
    <DashboardRankingContent tHeadLabels={['순위', '메뉴명', '매출액']}>
      <DashboardRankingContent.TableBody rankItems={menuRankItems} />
    </DashboardRankingContent>
  );
};

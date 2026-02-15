// 메뉴별 매출 랭킹 카드

import { useMemo } from 'react';

import type { DashboardRankItem } from '@/types/dashboard/menu';
import type {
  GetMenuSalesRankingResponseDto,
  MenuSales,
} from '@/types/menu/dto';
import type { Nullable } from '@/utils/shared';

import { MenuSalesRankingContent } from './MenuSalesRankingContent';

// dto를 대시보드의 메뉴 매출 랭킹 카드 UI에서 사용하는 데이터 형태로 변환
interface GetDashboardMenuRankItemsParams {
  items: MenuSales[];
}
const getDashboardMenuRankItems = ({
  items,
}: GetDashboardMenuRankItemsParams): DashboardRankItem[] => {
  if (!items) {
    return [];
  }
  // 매출액 기준으로 내림차순 정렬
  const sortedItems = [...items].sort(
    (a, b) => b.totalSalesAmount - a.totalSalesAmount,
  );
  return sortedItems.map((item, index) => ({
    rank: index + 1,
    itemName: item.menuName,
    totalAmount: item.totalSalesAmount,
    unit: '원',
  }));
};

// 편집 패널에서 보여질 데이터
const EXAMPLE_MENU_SALES = [
  {
    menuName: '아메리카노(ICE)',
    totalSalesAmount: 1500000,
    orderCount: 120,
  },
  {
    menuName: '카페라떼(HOT)',
    totalSalesAmount: 1200000,
    orderCount: 100,
  },
  {
    menuName: '카페모카(ICE)',
    totalSalesAmount: 900000,
    orderCount: 80,
  },
  {
    menuName: '바닐라 라떼(HOT)',
    totalSalesAmount: 600000,
    orderCount: 60,
  },
];

interface MenuSalesRankingCardContentProps extends Nullable<GetMenuSalesRankingResponseDto> {
  className?: string;
}

export const MenuSalesRankingCardContent = ({
  items = EXAMPLE_MENU_SALES,
}: MenuSalesRankingCardContentProps) => {
  // dto -> 대시보드의 메뉴 매출 랭킹 카드 UI 데이터 형태로 변환
  const menuRankItems = useMemo(
    () => getDashboardMenuRankItems({ items }),
    [items],
  );
  return (
    <MenuSalesRankingContent>
      <MenuSalesRankingContent.TableBody menuRankItems={menuRankItems} />
    </MenuSalesRankingContent>
  );
};

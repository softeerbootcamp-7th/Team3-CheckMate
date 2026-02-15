// 대시보드>메뉴분석에서 식재료별 소진량 랭킹 카드
import { useMemo } from 'react';

import { DASHBOARD_RANKING } from '@/constants/menu';
import type { DashboardRankItem } from '@/types/menu';
import type {
  GetIngredientUsageRankingResponseDto,
  IngredientUsage,
} from '@/types/menu/dto';

import { DashboardRankingContent } from './DashboardRankingContent';
import { IngredientUnregisteredContent } from './IngredientUnregisteredContent';

// dto를 대시보드의 식재료 소진량 랭킹 카드 UI에서 사용하는 데이터 형태로 변환
interface GetDashboardIngredientRankItemsParams {
  items: IngredientUsage[];
}
const getDashboardIngredientRankItems = ({
  items,
}: GetDashboardIngredientRankItemsParams): DashboardRankItem[] => {
  // 사용량 기준으로 내림차순 정렬
  // 단 kg , L 단위는 g, ml로 변환하여 비교해야 함
  const sortedItems = [...items].sort((a, b) => {
    const aQuantity =
      a.baseUnit === 'kg' || a.baseUnit === 'L'
        ? a.totalQuantity * 1000
        : a.totalQuantity;
    const bQuantity =
      b.baseUnit === 'kg' || b.baseUnit === 'L'
        ? b.totalQuantity * 1000
        : b.totalQuantity;
    return bQuantity - aQuantity;
  });
  return sortedItems
    .map((item, index) => ({
      rank: index + 1,
      itemName: item.ingredientName,
      totalAmount: item.totalQuantity,
      unit: item.baseUnit as DashboardRankItem['unit'],
    }))
    .slice(0, DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS); // 최대 4등까지만 보여줌
};

interface IngredientUsageRankingCardContentProps extends GetIngredientUsageRankingResponseDto {
  className?: string;
}

export const IngredientUsageRankingCardContent = ({
  hasIngredient,
  items,
}: IngredientUsageRankingCardContentProps) => {
  // dto -> 대시보드의 메뉴>식재료 소진량 랭킹 카드 UI 데이터 형태로 변환
  const ingredientRankItems = useMemo(
    () => getDashboardIngredientRankItems({ items }),
    [items],
  );
  // 등록된 식재료가 없는 경우 카드 내용
  if (!hasIngredient) {
    return <IngredientUnregisteredContent />;
  }
  // tHeadLabels를 통해 테이블 각 열의 이름을 지정
  return (
    <DashboardRankingContent tHeadLabels={['순위', '식재료명', '소진량']}>
      <DashboardRankingContent.TableBody rankItems={ingredientRankItems} />
    </DashboardRankingContent>
  );
};

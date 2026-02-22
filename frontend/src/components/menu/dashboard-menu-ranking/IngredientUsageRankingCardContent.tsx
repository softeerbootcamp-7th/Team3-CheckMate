// 대시보드>메뉴분석에서 식재료별 소진량 랭킹 카드
import { useMemo } from 'react';

import { INGREDIENT_UNIT } from '@/constants/ingredient';
import { DASHBOARD_RANKING } from '@/constants/menu';
import type { DashboardRankItem } from '@/types/menu';
import type {
  GetIngredientUsageRankingResponseDto,
  IngredientUsage,
} from '@/types/menu';

import { DashboardRankingContent } from './DashboardRankingContent';
import { IngredientUnregisteredContent } from './IngredientUnregisteredContent';

// dto를 대시보드의 식재료 소진량 랭킹 카드 UI에서 사용하는 데이터 형태로 변환
interface GetDashboardIngredientRankItemsParams {
  items: IngredientUsage[];
}
const getDashboardIngredientRankItems = ({
  items,
}: GetDashboardIngredientRankItemsParams): DashboardRankItem[] => {
  return items
    .map((item, index) => ({
      rank: index + 1,
      itemName: item.ingredientName,
      totalAmount: item.totalQuantity,
      unit: item.baseUnit as DashboardRankItem['unit'],
    }))
    .concat(
      Array.from({
        length: Math.max(
          0,
          DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS - items.length,
        ),
      }).map((_, index) => ({
        rank: items.length + index + 1,
        unit: INGREDIENT_UNIT.g, // 임시
        ...DASHBOARD_RANKING.EMPTY_RANK_ITEM,
      })),
    )
    .slice(0, DASHBOARD_RANKING.MAX_DISPLAYED_RANK_ITEMS); // 최대 4등까지만 보여줌
};

interface IngredientUsageRankingCardContentProps extends GetIngredientUsageRankingResponseDto {
  className?: string;
}

export const IngredientUsageRankingCardContent = ({
  hasIngredient,
  items,
  className,
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
    <DashboardRankingContent
      tHeadLabels={['순위', '식재료명', '소진량']}
      className={className}
    >
      <DashboardRankingContent.TableBody rankItems={ingredientRankItems} />
    </DashboardRankingContent>
  );
};

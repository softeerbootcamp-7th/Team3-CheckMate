import { RankBadge } from '@/components/shared';
import type { IngredientUnit } from '@/constants/ingredient';
import { DASHBOARD_RANKING } from '@/constants/menu';
import { formatNumber } from '@/utils/shared';

// 대시보드의 매출 랭킹, 식자재 랭킹 테이블에서 사용하는 각 행 아이템 컴포넌트
interface RankItemProps {
  rank: number;
  itemName: string;
  totalAmount: number;
  unit: '원' | IngredientUnit;
}

export const RankItem = ({
  rank,
  itemName,
  totalAmount,
  unit,
}: RankItemProps) => {
  const isHighlight = rank === DASHBOARD_RANKING.HIGHLIGHT_RANKING; // 1등만 하이라이트

  return (
    <tr>
      <td>
        <RankBadge
          rank={rank}
          size="smmd"
          variant={isHighlight ? 'highlight' : 'default'}
          className="shrink-0"
        />
      </td>
      <td>
        <span className="body-medium-semibold block w-30 truncate">
          {itemName}
        </span>
      </td>

      <td className="text-grey-600 flex justify-end gap-1">
        <span className="truncate">{formatNumber(totalAmount)}</span>
        <span>{unit}</span>
      </td>
    </tr>
  );
};

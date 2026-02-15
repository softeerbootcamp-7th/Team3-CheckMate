import { RankBadge } from '@/components/shared';
import type { IngredientUnit } from '@/constants/ingredient';
import { formatNumber } from '@/utils/shared';

// 매출 랭킹, 식자재 랭킹에서 사용하는 랭킹 아이템 컴포넌트
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
  const isHighlight = rank === 1; // 1등만 하이라이트

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
        <span className="body-medium-semibold min-w-5 truncate">
          {itemName}
        </span>
      </td>

      <td className="text-grey-600 flex w-full justify-end">
        <span className="truncate">{formatNumber(totalAmount)}</span>
        <span>{unit}</span>
      </td>
    </tr>
  );
};

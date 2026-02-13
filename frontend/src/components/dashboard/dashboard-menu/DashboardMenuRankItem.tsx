import { RankBadge } from '@/components/shared';
import { formatNumber } from '@/utils/shared';

interface DashboardMenuSalesRankItemProps {
  rank: number;
  itemName: string;
  amount: number;
  unit: string;
}

export const DashboardMenuRankItem = ({
  rank,
  itemName,
  amount,
  unit,
}: DashboardMenuSalesRankItemProps) => {
  const isHighlight = rank === 1; // 1등만 하이라이트

  return (
    <div className="flex justify-between gap-6">
      <div className="flex min-w-0 gap-3">
        <div>
          <RankBadge
            rank={rank}
            size="sm"
            variant={isHighlight ? 'highlight' : 'default'}
            className="shrink-0"
          />
        </div>
        <span className="body-medium-semibold min-w-5 truncate">
          {itemName}
        </span>
      </div>

      <div className="text-grey-900 flex text-end">
        <span className="truncate">{formatNumber(amount)}</span>
        <span>{unit}</span>
      </div>
    </div>
  );
};

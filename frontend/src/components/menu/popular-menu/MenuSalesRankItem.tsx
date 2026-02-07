import { RankBadge } from '@/components/shared';

const HIGHLIGHT_RANK_THRESHOLD = 3;

interface MenuSalesRankItemProps {
  rank: number;
  menuName: string;
  totalSalesAmount: number;
  totalOrderCount: number;
}

export const MenuSalesRankItem = ({
  rank,
  menuName,
  totalSalesAmount,
  totalOrderCount,
}: MenuSalesRankItemProps) => {
  const isHighlight = rank <= HIGHLIGHT_RANK_THRESHOLD;

  return (
    <li className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <RankBadge
          rank={rank}
          size="sm"
          variant={isHighlight ? 'highlight' : 'default'}
          className="shrink-0"
        />
        <span className="body-medium-semibold min-w-0 truncate">
          {menuName}
        </span>
      </div>
      <div className="body-medium-semibold flex shrink-0 items-center gap-8">
        <span className="text-grey-900 flex items-center gap-0.5">
          <span>{totalSalesAmount.toLocaleString('ko-KR')}</span>
          <span>원</span>
        </span>
        <span className="text-grey-600">
          {totalOrderCount.toLocaleString('ko-KR')}건
        </span>
      </div>
    </li>
  );
};

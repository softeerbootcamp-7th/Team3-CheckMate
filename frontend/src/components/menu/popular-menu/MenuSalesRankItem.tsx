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
    <tr>
      <td>
        <RankBadge
          rank={rank}
          size="sm"
          variant={isHighlight ? 'highlight' : 'default'}
          className="shrink-0"
        />
      </td>
      <td
        className="body-medium-semibold w-20 max-w-20"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {menuName}
      </td>
      <td className="text-grey-900 text-end">
        <span className="truncate">
          {totalSalesAmount.toLocaleString('ko-KR')}
        </span>
        <span>원</span>
      </td>
      <td className="text-grey-600 w-20 max-w-20">
        <div className="ml-3 flex w-20 items-center justify-end">
          <span className="block min-w-0 truncate">
            {totalOrderCount.toLocaleString('ko-KR')}
          </span>
          건
        </div>
      </td>
    </tr>
  );
};

import { XIcon } from 'lucide-react';

import { PeriodTag } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { CDN_BASE_URL } from '@/constants/shared/cdnBaseUrl';

interface MiniViewActiveCardProps {
  cardCode: string;
  posX: number;
  posY: number;
}
export const MiniViewActiveCard = ({
  cardCode,
  posX,
  posY,
}: MiniViewActiveCardProps) => {
  const card = DASHBOARD_METRIC_CARDS[cardCode];

  if (!card) {
    // 카드 정보가 없는 경우 렌더링하지 않음
    return null;
  }

  const handleRemove = () => alert(`카드 ${card.label} 제거`); // TODO: 카드 제거 로직 구현

  return (
    <div
      className="rounded-400 bg-grey-0 relative border-none"
      style={{
        gridColumn: `${posX} / span ${card ? card.sizeX : 1}`,
        gridRow: `${posY} / span ${card ? card.sizeY : 1}`,
      }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <img
          src={`${CDN_BASE_URL}/assets/images/${card?.type}.svg`}
          alt={`${card?.label} 미니 뷰`}
          className="size-15"
        />
        <p className="body-small-medium text-grey-900 mt-200 mb-100">
          {card?.label}
        </p>
        <PeriodTag isAdded period={'이번달'} />
      </div>
      {/* 상단 삭제 버튼 */}
      <Button
        className="bg-grey-100 text-grey-700 rounded-unlimit hover:border-grey-700 active:bg-grey-900 active:text-grey-50 absolute top-2.5 right-2.5 size-6 p-0! hover:border"
        onClick={handleRemove}
      >
        <XIcon className="size-5" />
      </Button>
    </div>
  );
};

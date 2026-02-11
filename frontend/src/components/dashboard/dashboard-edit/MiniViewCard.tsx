import { XIcon } from 'lucide-react';

import { PeriodTag } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { CDN_BASE_URL } from '@/constants/shared/cdnBaseUrl';
import { cn } from '@/utils/shared';

interface MiniViewCardProps {
  cardCode?: string;
  posX?: number;
  posY?: number;
}
export const MiniViewCard = ({
  cardCode = undefined,
  posX = 1,
  posY = 1,
}: MiniViewCardProps) => {
  const card = cardCode ? DASHBOARD_METRIC_CARDS[cardCode] : undefined;

  return (
    <div
      className={cn(
        'rounded-400',
        cardCode
          ? 'bg-grey-0 relative border-none'
          : 'border-grey-500 border-[1.5px] border-dashed',
      )}
      style={{
        gridColumn: `${posX} / span ${card ? card.sizeX : 1}`,
        gridRow: `${posY} / span ${card ? card.sizeY : 1}`,
      }}
    >
      {cardCode && (
        <>
          <Button className="bg-grey-100 rounded-unlimit absolute top-2.5 right-2.5 size-6">
            <XIcon className="text-grey-700 size-5" />
          </Button>
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
        </>
      )}
    </div>
  );
};

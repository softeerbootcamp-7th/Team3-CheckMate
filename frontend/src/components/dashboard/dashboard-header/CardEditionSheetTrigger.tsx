import CardsIcon from '@/assets/icons/cards.svg?react';
import { Button } from '@/components/shared/shadcn-ui';

export const CardEditionSheetTrigger = () => {
  return (
    <Button
      aria-label="현재 탭의 지표카드 편집"
      variant="outline"
      className="bg-grey-0 text-grey-700 gap-1 border-none p-300 pl-250 shadow-none"
    >
      <CardsIcon />
      카드 편집
    </Button>
  );
};

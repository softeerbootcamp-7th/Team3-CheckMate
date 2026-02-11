import { DefaultCardWrapper } from '@/components/shared';

export const HourlyOrderPatternCard = () => {
  return (
    <DefaultCardWrapper
      title="시간대별 메뉴 주문 건수"
      aria-label="시간대별 메뉴 주문 건수"
      className="flex h-80 w-full flex-col gap-5"
    >
      <div>시간대별 메뉴 주문 건수 막대 차트 위치</div>
    </DefaultCardWrapper>
  );
};

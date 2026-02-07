import { MenuAnalysisCard } from '../shared';

export const HourlyOrderPatternCard = () => {
  return (
    <MenuAnalysisCard
      title="시간대별 메뉴 주문 건수"
      aria-label="시간대별 메뉴 주문 건수"
      className="flex h-80 flex-col gap-5"
    >
      <div>시간대별 메뉴 주문 건수 막대 차트 위치</div>
    </MenuAnalysisCard>
  );
};

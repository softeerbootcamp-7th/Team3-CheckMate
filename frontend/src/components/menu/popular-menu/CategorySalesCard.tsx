import { MenuAnalysisCard } from '../shared';

// TODO: 도넛 차트 추가 필요
export const CategorySalesCard = () => {
  return (
    <MenuAnalysisCard
      aria-label="카테고리별 매출"
      className="flex h-80 flex-1 flex-col gap-12"
      title="카테고리별 매출"
    >
      <div>카테고리별 메출 도넛차트 위치</div>
    </MenuAnalysisCard>
  );
};

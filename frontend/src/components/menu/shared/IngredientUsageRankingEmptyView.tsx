import { ShoppingBasket } from 'lucide-react';

interface IngredientUsageRankingEmptyViewProps {
  isCustomPeriod?: boolean;
}

export const IngredientUsageRankingEmptyView = ({
  isCustomPeriod = false,
}: IngredientUsageRankingEmptyViewProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <ShoppingBasket className="text-brand-main size-full" />
      </div>
      <p className="body-large-bold text-grey-900 text-center whitespace-pre">
        {isCustomPeriod ? '' : '오늘 '}
        <span className="text-brand-main">소진된 식재료</span>가{'\n'}
        {isCustomPeriod ? '' : '아직 '}없어요
      </p>
      <span className="body-small-medium text-grey-700 text-center whitespace-pre">
        첫 주문이 들어오면{'\n'}식재료 소진량을 분석해 드릴게요!
      </span>
    </div>
  );
};

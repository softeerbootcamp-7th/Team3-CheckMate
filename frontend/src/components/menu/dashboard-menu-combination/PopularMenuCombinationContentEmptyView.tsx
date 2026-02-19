import { UtensilsCrossed } from 'lucide-react';

export const PopularMenuCombinationContentEmptyView = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <UtensilsCrossed className="text-brand-main size-full" />
      </div>
      <p className="body-large-bold text-grey-900 text-center whitespace-pre">
        아직 추천해 드릴{'\n'}
        <span className="text-brand-main">인기 조합</span>이 없어요.
      </p>
      <span className="caption-large-medium text-grey-700 text-center whitespace-pre">
        조금만 기다려 주시면{'\n'}맛있는 조합을 찾아올게요!
      </span>
    </div>
  );
};

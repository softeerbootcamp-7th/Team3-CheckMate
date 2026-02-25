import { UtensilsCrossed } from 'lucide-react';

export const MenuCombinationRankEmptyView = () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <UtensilsCrossed className="text-brand-main size-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="body-large-bold text-grey-900 text-center whitespace-pre">
          아직 추천해 드릴{' '}
          <span className="text-brand-main">인기 메뉴 조합</span>이 없어요.
        </p>
        <span className="body-small-medium text-grey-700 text-center whitespace-pre">
          충분한 주문 데이터가 모이면{'\n'}손님들이 자주 함께 찾는 메뉴{' '}
          <strong>TOP 3</strong>를 분석해 드릴게요!
        </span>
      </div>
    </div>
  );
};

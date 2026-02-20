import { PieChart } from 'lucide-react';

export const SalesTypeContentEmptyView = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <PieChart className="text-brand-main size-full" />
      </div>
      <p className="title-medium-bold text-grey-900 text-center whitespace-pre">
        판매 내역이 없어요
      </p>
      <span className="body-medium-medium text-grey-600 text-center whitespace-pre">
        선택하신 기간 동안 발생한 홀, 배달, 포장{'\n'}매출 데이터가 없습니다.
      </span>
    </div>
  );
};

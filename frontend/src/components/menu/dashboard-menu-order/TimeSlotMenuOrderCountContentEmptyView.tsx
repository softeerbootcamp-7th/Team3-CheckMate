import { Clock } from 'lucide-react';

export const TimeSlotMenuOrderCountContentEmptyView = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <Clock className="text-brand-main size-full" />
      </div>
      <p className="body-large-bold text-grey-900 text-center whitespace-pre">
        오늘
        <span className="text-brand-main">주문 데이터</span>가{'\n'}
        아직 없어요
      </p>
      <span className="caption-large-medium text-grey-700 text-center whitespace-pre">
        첫 주문이 들어오면{'\n'}
        시간대별 분석을 시작할게요!
      </span>
    </div>
  );
};

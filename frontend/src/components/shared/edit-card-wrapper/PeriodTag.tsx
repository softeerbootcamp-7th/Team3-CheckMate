import { cn } from '@/utils/shared';

interface PeriodTagProps {
  isAdded: boolean;
  period: string;
}

export const PeriodTag = ({ isAdded, period }: PeriodTagProps) => {
  // 대시보드 편집 용 패널의 좌측 위 기간 안내 태그

  return (
    <div
      className={cn(
        isAdded
          ? 'border border-gray-200 bg-gray-100 text-gray-900'
          : 'bg-gray-900 text-gray-50',
        'caption-large-semibold rounded-unlimit px-250 py-100 text-center',
      )}
    >
      {period}
    </div>
  );
};

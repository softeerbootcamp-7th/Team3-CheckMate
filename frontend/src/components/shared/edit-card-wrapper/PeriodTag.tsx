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
          ? 'border-grey-200 bg-grey-100 text-grey-900 border'
          : 'bg-grey-900 text-grey-50',
        'caption-large-semibold rounded-unlimit px-250 py-100 text-center',
      )}
    >
      {period}
    </div>
  );
};

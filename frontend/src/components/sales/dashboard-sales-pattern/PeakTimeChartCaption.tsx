import { cn } from '@/utils/shared';

interface PeakTimeChartCaptionProps {
  label: string;
  color: 'primary' | 'default';
}

export const PeakTimeChartCaption = ({
  label,
  color,
}: PeakTimeChartCaptionProps) => {
  return (
    <div className="flex items-center gap-1">
      <div
        className={cn(
          'size-1.25 rounded-full',
          color === 'primary' && 'bg-brand-main',
          color === 'default' && 'bg-grey-500',
        )}
      ></div>
      <span
        className={cn(
          'caption-large-medium',
          color === 'primary' && 'text-brand-main',
          color === 'default' && 'text-grey-500',
        )}
      >
        {label}
      </span>
    </div>
  );
};

import { cn } from '@/utils/shared';

interface SalesTrendCaptionProps {
  className?: string;
}

export const SalesTrendCaption = ({ className }: SalesTrendCaptionProps) => {
  return (
    <div
      className={cn(
        'caption-large-medium text-grey-600 absolute top-5.5 left-36 flex items-center gap-2',
        className,
      )}
    >
      <div className="flex items-center gap-1">
        <div className="h-4.5 w-2 rounded-t-[1px] bg-[linear-gradient(180deg,rgba(33,33,33,0.40)_0%,rgba(33,33,33,0.10)_100%)]" />
        <span>실매출</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-grey-400 size-1.25 rounded-full" />
        <span>주문건수</span>
      </div>
    </div>
  );
};

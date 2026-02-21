import { cn } from '@/utils/shared';

interface BoxSkeletonProps {
  className?: string;
}

export const BoxSkeleton = ({ className: classname }: BoxSkeletonProps) => {
  return (
    <div
      className={cn(
        'rounded-150 bg-grey-300 h-10.5 animate-pulse border-gray-200',
        classname,
      )}
    />
  );
};

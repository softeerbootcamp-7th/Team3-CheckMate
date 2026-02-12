import { cn } from '@/utils/shared';

interface BoxSkeletonProps {
  classname?: string;
}

export const BoxSkeleton = ({ classname }: BoxSkeletonProps) => {
  return (
    <div
      className={cn(
        'rounded-150 bg-grey-300 h-10.5 w-50 animate-pulse border-gray-200',
        classname,
      )}
    />
  );
};

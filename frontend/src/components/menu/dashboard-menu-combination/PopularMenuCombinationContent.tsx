import { cn } from '@/utils/shared';

interface PopularMenuCombinationContentProps {
  className?: string;
  baseMenuName?: string;
  pairedMenu?: string;
}

export const PopularMenuCombinationContent = ({
  className,
  baseMenuName,
  pairedMenu,
}: PopularMenuCombinationContentProps) => {
  return (
    <p
      className={cn(
        'title-large-semibold text-grey-900 flex h-34 w-75 flex-col justify-end',
        className,
      )}
    >
      <span>최고 인기 조합은</span>
      <span className="title-large-bold text-brand-main min-w-0 truncate">
        {baseMenuName}
      </span>
      <span className="flex w-full items-center gap-1">
        <span className="title-large-bold text-brand-main min-w-0 truncate">
          &{pairedMenu}
        </span>
        <span className="whitespace-nowrap">입니다</span>
      </span>
    </p>
  );
};

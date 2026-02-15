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
        'title-large-semibold text-grey-900 flex w-75 flex-col',
        className,
      )}
    >
      <span>최고 인기 조합은</span>
      <strong className="title-large-bold text-brand-main min-w-0 truncate">
        {baseMenuName}
      </strong>
      <span className="flex w-full items-center gap-1">
        <strong className="title-large-bold text-brand-main min-w-0 truncate">
          &{pairedMenu}
        </strong>
        <span className="whitespace-nowrap">입니다</span>
      </span>
    </p>
  );
};

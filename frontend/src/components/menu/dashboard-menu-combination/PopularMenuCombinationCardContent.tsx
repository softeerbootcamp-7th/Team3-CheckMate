import { PopularMenuCombinationContent } from './PopularMenuCombinationContent';
import { PopularMenuCombinationContentEmptyView } from './PopularMenuCombinationContentEmptyView';

interface PopularMenuCombinationCardContentProps {
  className?: string;
  firstMenuName?: string | null;
  secondMenuName?: string | null;
}

export const PopularMenuCombinationCardContent = ({
  firstMenuName,
  secondMenuName,
  className,
}: PopularMenuCombinationCardContentProps) => {
  if (!firstMenuName || !secondMenuName) {
    return <PopularMenuCombinationContentEmptyView />;
  }
  return (
    <PopularMenuCombinationContent
      baseMenuName={firstMenuName}
      pairedMenu={secondMenuName}
      className={className}
    />
  );
};

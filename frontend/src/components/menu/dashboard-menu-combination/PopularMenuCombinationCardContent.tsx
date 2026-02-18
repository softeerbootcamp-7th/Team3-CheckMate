import { POPULAR_MENU_COMBINATION } from '@/constants/menu';
import type { GetDashboardPopularMenuCombinationResponseDto } from '@/types/menu/dto';

import { PopularMenuCombinationContent } from './PopularMenuCombinationContent';

const { EXAMPLE_FIRST_MENU_NAME, EXAMPLE_SECOND_MENU_NAME } =
  POPULAR_MENU_COMBINATION;
interface PopularMenuCombinationCardContentProps extends GetDashboardPopularMenuCombinationResponseDto {
  className?: string;
}

export const PopularMenuCombinationCardContent = ({
  firstMenuName = EXAMPLE_FIRST_MENU_NAME,
  secondMenuName = EXAMPLE_SECOND_MENU_NAME,
  className,
}: PopularMenuCombinationCardContentProps) => {
  return (
    <PopularMenuCombinationContent
      baseMenuName={firstMenuName}
      pairedMenu={secondMenuName}
      className={className}
    />
  );
};

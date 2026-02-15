import { POPULAR_MENU_COMBINATION } from '@/constants/menu';
import type { GetDashboardPopularMenuCombinationResponseDto } from '@/types/menu/dto';

import { PopularMenuCombinationContent } from './PopularMenuCombinationContent';

const { EXAMPLE_FIRST_MENU_SALES, EXAMPLE_SECOND_MENU_SALES } =
  POPULAR_MENU_COMBINATION;
interface PopularMenuCombinationCardContentProps extends GetDashboardPopularMenuCombinationResponseDto {
  className?: string;
}

export const PopularMenuCombinationCardContent = ({
  firstMenuName = EXAMPLE_FIRST_MENU_SALES,
  secondMenuName = EXAMPLE_SECOND_MENU_SALES,
}: PopularMenuCombinationCardContentProps) => {
  return (
    <PopularMenuCombinationContent
      baseMenuName={firstMenuName}
      pairedMenu={secondMenuName}
    />
  );
};

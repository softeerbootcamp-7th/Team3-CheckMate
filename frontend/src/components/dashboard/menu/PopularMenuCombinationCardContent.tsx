import type { GetDashboardPopularMenuCombinationResponseDto } from '@/types/dashboard/menu/dto';
import type { Nullable } from '@/utils/shared';

import { PopularMenuCombinationContent } from './PopularMenuCombinationContent';

// 편집 패널에서 보여질 데이터
const EXAMPLE_FIRST_MENU_SALES = '아메리카노(ICE)';
const EXAMPLE_SECOND_MENU_SALES = '휘낭시에';

interface PopularMenuCombinationCardContentProps extends Nullable<GetDashboardPopularMenuCombinationResponseDto> {
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

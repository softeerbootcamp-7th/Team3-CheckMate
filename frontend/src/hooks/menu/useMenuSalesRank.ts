import { useMemo, useState } from 'react';

import { MENU_SALES_RANK } from '@/constants/menu';
import { menuSalesRankItems } from '@/mocks/data/menu';

export const useMenuSalesRank = () => {
  const { ITEMS_PER_PAGE, INITIAL_PAGE } = MENU_SALES_RANK;

  const [rankPage, setRankPage] = useState<number>(INITIAL_PAGE);
  const displayedRankItems = useMemo(() => {
    return menuSalesRankItems.slice(0, rankPage * ITEMS_PER_PAGE);
  }, [rankPage, ITEMS_PER_PAGE]);

  // TODO: api 연동 시 menuSalesRankItems mock data에서 실제 데이터로 변경 필요
  const hasMoreItems = rankPage * ITEMS_PER_PAGE < menuSalesRankItems.length;

  const handleClickMoreButton = () => {
    setRankPage((prev) => prev + 1);
  };

  return {
    displayedRankItems,
    hasMoreItems,
    handleClickMoreButton,
  };
};

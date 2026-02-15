import { useMemo } from 'react';

import type {
  GetPopularMenuCombinationResponseDto,
  PoplularMenuCombination,
} from '@/types/menu/dto';
import type { Nullable } from '@/utils/shared';

import { PopularMenuCombinationContent } from './PopularMenuCombinationContent';

// 편집 패널에서 보여질 데이터
const EXAMPLE_MENU_SALES = [
  {
    baseMenuName: '아메리카노(ICE)',
    pairedMenus: [
      { menuName: '휘낭시에', count: 80 },
      { menuName: '콜라', count: 70 },
    ],
  },
];

// 가장 인기 있는 메뉴와 그 메뉴와의 1등 조합 메뉴를 반환하는 함수
const getPopularMenuCombination = ({
  items,
}: {
  items: PoplularMenuCombination[] | null;
}) => {
  // 데이터가 없으면 빈 문자열 반환
  if (!items || items.length === 0) {
    return { baseMenuName: '', mostPopularPairedMenuName: '' };
  }
  const baseMenuName = items[0].baseMenuName; // 가장 인기 있는 메뉴
  if (!items[0].pairedMenus || items[0].pairedMenus.length === 0) {
    // 조합 데이터가 없으면 빈 문자열 반환
    return { baseMenuName, mostPopularPairedMenuName: '' };
  }
  // 가장 많이 팔린 페어 메뉴 찾기
  const mostPopularPairedMenuName = [...items[0].pairedMenus].sort(
    (a, b) => b.count - a.count,
  )[0].menuName;
  return { baseMenuName, mostPopularPairedMenuName };
};

interface PopularMenuCombinationCardContentProps extends Nullable<GetPopularMenuCombinationResponseDto> {
  className?: string;
}

export const PopularMenuCombinationCardContent = ({
  items = EXAMPLE_MENU_SALES,
}: PopularMenuCombinationCardContentProps) => {
  // 가장 인기 있는 메뉴와 그 메뉴와의 1등 조합 메뉴
  const { baseMenuName, mostPopularPairedMenuName } = useMemo(
    () => getPopularMenuCombination({ items }),
    [items],
  );

  return (
    <PopularMenuCombinationContent
      baseMenuName={baseMenuName}
      pairedMenu={mostPopularPairedMenuName}
    />
  );
};

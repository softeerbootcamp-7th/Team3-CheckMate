import { useMemo, useState } from 'react';

import type { MenuInfo } from '@/types/ingredient';
import type { CategoryMenu } from '@/types/ingredient/MenuInfo';

interface useCategoryMenusParams {
  categoryMenus: CategoryMenu[];
}

export const useCategoryMenus = ({ categoryMenus }: useCategoryMenusParams) => {
  // 카테고리 별로 메뉴 관리할 수 있는 맵 객체
  const menusByCategory = useMemo(() => {
    const MenuMapByCategory = new Map<string, MenuInfo[]>();

    categoryMenus.forEach((category) => {
      MenuMapByCategory.set(category.category, category.menus); // 카테고리명 -> 키, 메뉴들 -> 키에 대응되는 값으로 초기화
    });

    return MenuMapByCategory;
  }, [categoryMenus]);

  // 카테고리 목록
  // useMemo으로 감싸서 categories 배열이 렌더링 때마다 재생성 되는 것 방지
  const categories = Array.from(menusByCategory.keys());

  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0] ?? null,
  );
  // 선택된 카테고리에 해당되는 메뉴 필터링
  const filteredMenus = selectedCategory
    ? (menusByCategory.get(selectedCategory) ?? [])
    : [];

  return {
    categories,
    selectedCategory,
    filteredMenus,
    setSelectedCategory,
  };
};

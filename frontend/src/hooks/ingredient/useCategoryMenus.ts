import { useMemo, useState } from 'react';

import type { MenuInfo } from '@/types/ingredient';

interface useCategoryMenusParams {
  menus: MenuInfo[];
}

export const useCategoryMenus = ({ menus }: useCategoryMenusParams) => {
  // 카테고리 별로 메뉴 관리
  const menusByCategory = useMemo(() => {
    const MenuMapByCategory = new Map<string, MenuInfo[]>();

    menus.forEach((menu) => {
      let categoryMenus = MenuMapByCategory.get(menu.category);

      if (!categoryMenus) {
        categoryMenus = [];
        MenuMapByCategory.set(menu.category, categoryMenus);
      }

      categoryMenus.push(menu);
    });

    return MenuMapByCategory;
  }, [menus]);

  // 카테고리 목록
  // 각 메뉴에 카테고리 정보 있다고 가정 -> 중복 제거 후 카테고리 목록 생성
  // useMemo으로 감싸서 categories 배열이 렌더링 때마다 재생성 되는 것 방지
  const categories = useMemo(
    () => Array.from(menusByCategory.keys()),
    [menusByCategory],
  );

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

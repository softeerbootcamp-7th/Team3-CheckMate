import { useEffect } from 'react';

import { ITEMS_PER_PAGE } from '@/constants/ingredient';
import type { MenuInfo } from '@/types/ingredient';

import { usePagination } from '../shared/usePagination';

import { useCategoryMenus } from './useCategoryMenus';

interface UseMenusManagementParams {
  menus: MenuInfo[];
}

export const useMenusManagement = ({ menus }: UseMenusManagementParams) => {
  const categoryMenus = useCategoryMenus({ menus });
  const pagination = usePagination<MenuInfo>({
    items: categoryMenus.filteredMenus,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // 카테고리 변경 시 화면에 보여지는 페이지를 1페이지로 리셋
  useEffect(() => {
    const resetCurrentPageNumber = () => {
      pagination.setCurrentPage(1);
    };
    resetCurrentPageNumber();
  }, [categoryMenus.selectedCategory, pagination]);

  // selectedCategory는 맨 처음 마운트 될 땐 null 값으로 설정됨
  // -> 서버에서 데이터 가져오면 그걸 기반으로 첫 번째 카테고리를 선택된 카테고리로 설정해줘야함
  // -> 안해주면 selectedCategory는 상태값 이기 때문에 마운트 때 설정된 null 값으로 그대로 유지됨
  useEffect(() => {
    const setFirstCategory = () => {
      categoryMenus.setSelectedCategory(categoryMenus.categories[0]);
    };
    // 초기 선택된 카테고리가 없을 때, 첫 번째 카테고리로 설정
    if (
      !categoryMenus.selectedCategory &&
      categoryMenus.categories.length > 0
    ) {
      setFirstCategory();
    }
  }, [categoryMenus, categoryMenus.categories]);

  return {
    ...categoryMenus,
    ...pagination,
  };
};

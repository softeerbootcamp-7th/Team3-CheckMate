import { useEffect } from 'react';

import { ITEMS_PER_PAGE } from '@/constants/ingredient';
import type { MenuInfo } from '@/types/ingredient';
import type { CategoryMenu } from '@/types/ingredient';

import { usePagination } from '../shared/usePagination';

import { useCategoryMenus } from './useCategoryMenus';

interface UseMenusManagementParams {
  categoryMenus: CategoryMenu[];
}

export const useMenusManagement = ({
  categoryMenus,
}: UseMenusManagementParams) => {
  const { filteredMenus, selectedCategory, setSelectedCategory, categories } =
    useCategoryMenus({ categoryMenus });
  const pagination = usePagination<MenuInfo>({
    items: filteredMenus, // 특정 카테고리에 해당하는 메뉴들만
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // setCurrentPage를 꺼내서 useEffect의 의존성 배열에 넣어줘야 함
  // pagination 객체 자체는 매 렌더링마다 새로운 객체이기 때문에 pagination을 의존성 배열에 넣으면 무한 루프에 빠짐
  // setter 함수는 매번 같은 참조
  const { setCurrentPage } = pagination;

  // 카테고리 변경 시 화면에 보여지는 페이지를 1페이지로 리셋
  useEffect(() => {
    const resetCurrentPageNumber = () => {
      setCurrentPage(1);
    };
    resetCurrentPageNumber();
  }, [selectedCategory, setCurrentPage]);

  // selectedCategory는 맨 처음 마운트 될 땐 null 값으로 설정됨
  // -> 서버에서 데이터 가져오면 그걸 기반으로 첫 번째 카테고리를 선택된 카테고리로 설정해줘야함
  // -> 안해주면 selectedCategory는 상태값 이기 때문에 마운트 때 설정된 null 값으로 그대로 유지됨
  useEffect(() => {
    const setFirstCategory = () => {
      setSelectedCategory(categories[0]);
    };
    // 초기 선택된 카테고리가 없을 때, 첫 번째 카테고리를 선택된 카테고리로 설정
    if (!selectedCategory && categories.length > 0) {
      setFirstCategory();
    }
  }, [categories, selectedCategory, setSelectedCategory]);
  return {
    filteredMenus,
    selectedCategory,
    setSelectedCategory,
    categories,
    ...pagination,
  };
};

import { useEffect, useState } from 'react';

import type { MenuInfo } from '@/types/ingredient';

interface UseMenusManagementParams {
  menus: MenuInfo[];
}
const ITEMS_PER_PAGE = 12;

export const useMenusManagement = ({ menus }: UseMenusManagementParams) => {
  // 카테고리 목록
  const categories = Array.from(new Set(menus.map((menu) => menu.category)));

  // 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0] ?? null,
  );

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 카테고리에 해당되는 메뉴 필터링
  const filteredMenus = menus.filter(
    (menu) => menu.category === selectedCategory,
  );

  // 선택된 카테고리에 해당하는 메뉴들의 전체 페이지 수
  const totalPageCount = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);

  // 현재 보고 있는 페이지가 양 끝단 페이지인지
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  // 현재 페이지에 보여줘야 할 메뉴들의 시작 인덱스
  const currentPageMenusStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // 현재 페이지에 해당하는 메뉴들만 모아 리스트에 저장
  const currentPageMenus = filteredMenus.slice(
    currentPageMenusStartIndex,
    currentPageMenusStartIndex + ITEMS_PER_PAGE,
  );

  const handleClickPrev = () => {
    if (isFirstPage) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const handleClickNext = () => {
    if (isLastPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const handleClickPage = (page: number) => {
    setCurrentPage(page);
  };

  // 카테고리 변경 시 화면에 보여지는 페이지를 1페이지로 리셋
  useEffect(() => {
    const resetCurrentPageNumber = () => {
      setCurrentPage(1);
    };
    resetCurrentPageNumber();
  }, [selectedCategory]);

  useEffect(() => {
    const setFirstCategory = () => {
      setSelectedCategory(categories[0]);
    };
    // 초기 선택된 카테고리가 없을 때, 첫 번째 카테고리로 설정
    if (!selectedCategory && categories.length > 0) {
      setFirstCategory();
    }
  }, [categories, selectedCategory]);

  return {
    categories,
    selectedCategory,
    currentPageMenus,
    totalPageCount,
    currentPage,

    isFirstPage,
    isLastPage,

    setSelectedCategory,
    handleClickPrev,
    handleClickNext,
    handleClickPage,
  };
};

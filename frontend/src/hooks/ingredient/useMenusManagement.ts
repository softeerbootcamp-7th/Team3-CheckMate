import { useEffect, useState } from 'react';

import type { MenuInfo } from '@/types/ingredient';

interface UseMenusManagementParams {
  menus: MenuInfo[];
}

// 한 페이지에 보여줄 수 있는 최대 메뉴  개수
const ITEMS_PER_PAGE = 12;

export const useMenusManagement = ({ menus }: UseMenusManagementParams) => {
  // 카테고리 목록
  // 각 메뉴에 카테고리 정보 있다고 가정 -> 중복 제거 후 카테고리 목록 생성
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
  // 카테고리에 해당하는 메뉴 데이터가 있어야 카테고리가 생성되므로 filteredMenus.length이 0일 수는 없음
  const totalPageCount = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);

  // 현재 보고 있는 페이지가 양 끝단 페이지인지
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  // 현재 페이지에 보여줘야 할 메뉴들의 시작 인덱스
  // 1번째 페이지 : 0번째 요소 ~11
  // 2번째 페이지 : 12번째 요소 ~23
  const currentPageMenusStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // 현재 페이지에 해당하는 메뉴들만 모아 리스트에 저장
  const currentPageMenus = filteredMenus.slice(
    currentPageMenusStartIndex,
    currentPageMenusStartIndex + ITEMS_PER_PAGE,
  );

  // 이전 페이지 버튼 클릭 핸들러
  const handleClickPrev = () => {
    if (isFirstPage) {
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  // 다음 페이지 버튼 클릭 핸들러
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

  // selectedCategory는 맨 처음 마운트 될 땐 null 값으로 설정됨
  // -> 서버에서 데이터 가져오면 그걸 기반으로 첫 번째 카테고리를 선택된 카테고리로 설정해줘야함
  // -> 안해주면 selectedCategory는 상태값 이기 때문에 마운트 때 설정된 null 값으로 그대로 유지됨
  useEffect(() => {
    const setFirstCategory = () => {
      setSelectedCategory(categories[0]);
    };
    // 초기 선택된 카테고리가 없을 때, 첫 번째 카테고리로 설정
    if (!selectedCategory && categories.length > 0) {
      setFirstCategory();
    }
  }, [categories]);

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

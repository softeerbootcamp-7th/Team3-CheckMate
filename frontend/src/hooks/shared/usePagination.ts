import { useState } from 'react';

interface UsePaginationParams<T> {
  items: T[];
  itemsPerPage: number; // 한 페이지에 보여줄 아이템 개수
}

export const usePagination = <T>({
  items,
  itemsPerPage,
}: UsePaginationParams<T>) => {
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  //아이템들의 전체 페이지 수 -> 최소 1페이지 이상
  const totalPageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // 현재 보고 있는 페이지가 양 끝단 페이지인지
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPageCount;

  // 현재 페이지에 보여줘야 할 아이템들의 시작 인덱스
  // 1번째 페이지 : 0번째 요소 ~ itemsPerPage -1
  // 2번째 페이지 : itemsPerPage번째 요소 ~ 2*itemsPerPage -1
  const currentPageItemsStartIndex = (currentPage - 1) * itemsPerPage;
  // 현재 페이지에 해당하는 아이템들만 모아 리스트에 저장
  const currentPageItems = items.slice(
    currentPageItemsStartIndex,
    currentPageItemsStartIndex + itemsPerPage,
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

  return {
    totalPageCount,
    currentPage,

    isFirstPage,
    isLastPage,
    setCurrentPage,

    handleClickPrev,
    handleClickNext,
    handleClickPage,

    currentPageItems,
  };
};

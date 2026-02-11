import {
  IngredientManagementHeader,
  IngredientMenuCategories,
  IngredientMenuGrid,
  IngredientPaginationBar,
} from '@/components/ingredient';
import { useMenusManagement, useRegisteredMenus } from '@/hooks/ingredient';

export const IngredientManagement = () => {
  // 서버에 등록되어 있는 메뉴들 불러오기
  const { data } = useRegisteredMenus();

  const {
    categories,
    selectedCategory,
    currentPageItems,
    totalPageCount,
    currentPage,
    isFirstPage,
    isLastPage,
    setSelectedCategory,
    handleClickPrev,
    handleClickNext,
    handleClickPage,
  } = useMenusManagement({ menus: data?.menus ?? [] });

  return (
    <div className="flex flex-col gap-7.5">
      <IngredientManagementHeader />
      <IngredientMenuCategories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className="flex w-265 flex-col gap-6">
        <IngredientMenuGrid currentPageMenus={currentPageItems} />
        {totalPageCount >= 2 && ( // 2페이지 이상일 때만 하단 페이지네이션 바 노출
          <IngredientPaginationBar
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            handleClickPrev={handleClickPrev}
            handleClickNext={handleClickNext}
            handleClickPage={handleClickPage}
          />
        )}
      </section>
    </div>
  );
};

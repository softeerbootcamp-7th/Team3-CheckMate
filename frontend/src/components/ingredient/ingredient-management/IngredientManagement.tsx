import { UtensilsCrossed } from 'lucide-react';

import { PaginationBar } from '@/components/shared';
import {
  useMenusManagement,
  useRegisteredMenusQuery,
} from '@/hooks/ingredient';

import { IngredientManagementHeader } from './IngredientManagementHeader';
import { IngredientMenuCategories } from './IngredientMenuCategories';
import { IngredientMenuGrid } from './IngredientMenuGrid';

export const IngredientManagement = () => {
  // 서버에 등록되어 있는 메뉴들 불러오기
  const { data } = useRegisteredMenusQuery();

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
  } = useMenusManagement({ categoryMenus: data ?? [] });

  return (
    <div className="flex flex-col gap-7.5">
      <IngredientManagementHeader />

      {categories.length === 0 ? ( // 등록된 메뉴가 하나도 없는 경우 -> 안내 문구 출력
        <div className="mt-20 flex flex-1 flex-col items-center gap-8">
          <div className="bg-brand-50 size-20 rounded-full p-4">
            <UtensilsCrossed className="text-brand-main size-full" />
          </div>
          <p className="flex flex-col items-center gap-3">
            <h3 className="title-medium-medium text-grey-900">
              현재 매장에 등록되어 있는 메뉴가 없어요.
            </h3>
            <span className="body-medium-medium text-grey-700">
              POS를 통해 메뉴를 등록해주세요.
            </span>
          </p>
        </div>
      ) : (
        <main className="flex w-265 flex-col items-center gap-8 self-start">
          <IngredientMenuCategories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <section className="flex flex-col gap-7">
            <IngredientMenuGrid currentPageMenus={currentPageItems} />
            {totalPageCount >= 2 && ( // 2페이지 이상일 때만 하단 페이지네이션 바 노출
              <PaginationBar
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
        </main>
      )}
    </div>
  );
};

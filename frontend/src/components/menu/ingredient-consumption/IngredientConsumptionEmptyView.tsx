import { Link } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import { CDN_BASE_URL, ROUTE_PATHS } from '@/constants/shared';

export const IngredientConsumptionEmptyView = () => {
  return (
    <DefaultCardWrapper
      aria-label="식재료 미등록"
      className="flex h-95.5 flex-col items-center justify-center gap-6"
    >
      <div className="flex flex-col items-center gap-2">
        <img
          src={`${CDN_BASE_URL}/assets/images/empty_ingridient.svg`}
          alt="식재료 미등록 이미지"
          className="size-20"
        />
        <p className="body-small-semibold text-grey-900 text-center whitespace-pre">{`메뉴별 식재료가 등록되지 않아,\n소진량을 파악할 수 없어요.`}</p>
      </div>
      <Button
        asChild
        className="rounded-150 bg-brand-main text-grey-50 body-small-semibold! flex h-10 w-fit items-center justify-center px-600 py-150"
      >
        <Link to={ROUTE_PATHS.PRIVACY}>식재료 등록하기</Link>
      </Button>
    </DefaultCardWrapper>
  );
};

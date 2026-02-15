import { CDN_BASE_URL } from '@/constants/shared';
import { cn } from '@/utils/shared';

interface IngredientUnregisteredContentProps {
  className?: string;
}

// 등록된 식재료가 없는 경우 화면에 보여질 컴포넌트
export const IngredientUnregisteredContent = ({
  className,
}: IngredientUnregisteredContentProps) => {
  return (
    <div className={cn('flex w-75 flex-col items-center', className)}>
      <div className="flex flex-col items-center gap-1">
        <img
          src={`${CDN_BASE_URL}/assets/images/empty_ingridient.svg`}
          alt="식재료 미등록 이미지"
          className="size-18"
        />
        <span className="body-large-bold">식재료 미등록</span>
        <span className="body-small-medium text-grey-700 text-center">
          자동으로 식재료 파악하고,
          <br /> 간편하게 매장을 운영하세요.
        </span>
      </div>
    </div>
  );
};

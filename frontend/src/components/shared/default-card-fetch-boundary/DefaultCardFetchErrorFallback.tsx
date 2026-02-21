import type { FallbackProps } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { StateWrapper } from '@/components/shared/';
import { Button } from '@/components/shared/shadcn-ui';

// 기본 카드(흰 배경, 모서리 라운드)용 에러 폴백 컴포넌트
interface DefaultCardFetchErrorFallbackProps extends FallbackProps {
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const DefaultCardFetchErrorFallback = ({
  resetErrorBoundary,
  cardHeight,
  cardWidth,
  className,
}: DefaultCardFetchErrorFallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const handleClickReset = () => {
    resetErrorBoundary(); // 에러 바운더리의 에러상태 초기화 -> 이걸 해야 에러 바운더리가 다시 자식 컴포넌트를 렌더링 시도함
    reset(); // tanstack Query의 에러 상태를 초기화
  };
  return (
    <StateWrapper width={cardWidth} height={cardHeight} className={className}>
      <div className="flex flex-col items-center gap-3">
        <pre className="body-medium-medium text-center">
          오류가 발생했습니다!
        </pre>

        <Button
          className="rounded-200 body-medium-medium bg-brand-main text-grey-50 px-4 py-3"
          onClick={handleClickReset}
        >
          다시 불러오기
        </Button>
      </div>
    </StateWrapper>
  );
};

import type { CSSProperties } from 'react';

import { Spinner, StateWrapper } from '@/components/shared/';

// 기본 카드(흰 배경, 모서리 라운드)용 로딩 폴백 컴포넌트
interface DefaultCardFetchLoadingFallbackProps {
  className?: string;
  style?: CSSProperties;
}
export const DefaultCardFetchLoadingFallback = ({
  className,
  style,
}: DefaultCardFetchLoadingFallbackProps) => {
  return (
    <StateWrapper className={className} style={style}>
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8" />
        <span className="body-medium-medium">데이터를 불러오는 중 입니다</span>
      </div>
    </StateWrapper>
  );
};

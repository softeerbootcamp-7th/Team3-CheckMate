import { useLayoutEffect } from 'react';

import { BAR_CHART } from '@/constants/shared';

interface UseBarChartInitAnimationProps {
  barRef: React.RefObject<SVGGElement | null>;
  hasAnimation: boolean;
}
export const useBarInitAnimation = ({
  barRef,
  hasAnimation,
}: UseBarChartInitAnimationProps) => {
  // paint 되기 전에 실행(scaleY 0 설정)되어야 하므로 useEffect 가 아닌 useLayoutEffect 사용
  useLayoutEffect(() => {
    if (!barRef || !barRef.current || !hasAnimation) {
      return;
    }

    // 막대그래프의 초기 y 높이 0으로 설정 -> 안보이게
    barRef.current.style.transform = 'scaleY(0)';

    // 다음 프레임에서 높이를 1로 변경
    const raf = requestAnimationFrame(() => {
      if (barRef.current) {
        barRef.current.style.transition = `transform ${BAR_CHART.ANIMATION_DURATION_MS}ms ease-out`;
        barRef.current.style.transform = 'scaleY(1)';
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [barRef, hasAnimation]); // -> 처음 마운트 될 때만 실행
};

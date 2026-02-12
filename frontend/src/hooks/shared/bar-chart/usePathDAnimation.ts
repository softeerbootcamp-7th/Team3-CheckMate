import { useEffect } from 'react';

import { BAR_CHART } from '@/constants/shared';
interface UsePathDAnimationProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  hasAnimation: boolean;
}

export const usePathDAnimation = ({
  pathRef,

  hasAnimation,
}: UsePathDAnimationProps) => {
  // path 애니메이션: d 속성 변경 시 애니메이션 적용
  useEffect(() => {
    if (!pathRef.current || !hasAnimation) {
      return;
    }
    pathRef.current.style.transition = `d ${BAR_CHART.ANIMATION_DURATION_MS}ms ease-in-out`;
  }, [pathRef, hasAnimation]);
};

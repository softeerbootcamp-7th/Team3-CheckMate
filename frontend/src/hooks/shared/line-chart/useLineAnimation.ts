import { useLayoutEffect, useRef } from 'react';

interface UseLineAnimationProps {
  coordinateCount: number;
  pathD: string;
}

export const useLineAnimation = ({
  coordinateCount,
  pathD,
}: UseLineAnimationProps) => {
  const lineRef = useRef<SVGPathElement>(null);

  // 꺾은선 차트 직선 길이 저장
  const lineLengthRef = useRef(0);

  // 좌표 개수 저장
  const coordinateCountRef = useRef(0);

  useLayoutEffect(() => {
    if (!lineRef.current || !pathD) {
      return;
    }
    let rafId: number | null = null;

    // 좌표가 추가될 때마다 그려지는 애니메이션 적용
    if (coordinateCountRef.current !== coordinateCount) {
      coordinateCountRef.current = coordinateCount;
      const totalLineLength = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${totalLineLength}`;
      lineRef.current.style.strokeDashoffset = `${totalLineLength - lineLengthRef.current}`;
      lineRef.current.style.transition = 'none'; // 초기화 시에는 transition 비활성화
      lineLengthRef.current = totalLineLength;

      // 위 css 적용되어 브라우저에서 렌더링된 후
      // 다음 프레임에 transition 적용을 강제하기 위해 requestAnimationFrame 사용
      rafId = requestAnimationFrame(() => {
        if (lineRef.current) {
          lineRef.current.style.transition = 'stroke-dashoffset 1s ease-in-out';
          lineRef.current.style.strokeDashoffset = '0';
        }
      });
    } else {
      // stroke-dasharray, stroke-dashoffset 속성 제거 선이 끊기는 현상 방지
      lineRef.current.style.removeProperty('stroke-dasharray');
      lineRef.current.style.removeProperty('stroke-dashoffset');
      lineRef.current.style.transition = 'd 0.5s ease-in-out';
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [lineRef, pathD, coordinateCount]);

  return {
    lineRef,
  };
};

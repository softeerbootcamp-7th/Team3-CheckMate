import { useLayoutEffect, useRef, useState } from 'react';

interface UseScaledWrapperSizeParams {
  // scale 비율
  scale: number;

  // wrapper 내 한쪽 패딩(px)
  wrapperPadding: number;

  // 헤더 높이(px)
  headerHeight: number;
  // 헤더와 내용 사이 간격(px)
  headerGap: number;
}

export const useEditCardWrapperMeasure = ({
  scale,
  wrapperPadding,
  headerHeight,
  headerGap,
}: UseScaledWrapperSizeParams) => {
  const childRef = useRef<HTMLDivElement | null>(null); // 자식 요소 dom에서 잡기용
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (childRef.current) {
      const { width, height } = {
        width: childRef.current.clientWidth,
        height: childRef.current.clientHeight,
      };

      setSize({ width, height });
    }
  }, []);

  // 전체 카드 크기 계산
  // 카드 가로 크기 = (자식 컴포넌트 가로 크기 * 축소 비율) + 왼쪽 오른쪽 여백
  const computedCardWidth = Math.floor(size.width * scale) + wrapperPadding * 2;
  // 카드 세로 크기 = (자식 컴포넌트 세로 크기 * 축소 비율) + 위쪽 아래 여백 + 헤더높이 + 헤더와 내용 사이 여백
  const computedCardHeight =
    Math.floor(size.height * scale) +
    wrapperPadding * 2 +
    headerHeight +
    headerGap;
  return {
    childRef,
    computedCardWidth,
    computedCardHeight,
  };
};

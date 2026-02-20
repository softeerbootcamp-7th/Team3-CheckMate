import { useEffect, useMemo, useRef } from 'react';

import { throttle } from '@/utils/shared';

/**
 * @param fn - 스로틀링 할 함수
 * @param throttleMs - 스로틀링 간격 (millisecond 단위), 기본값 50ms
 */
export function useThrottle<T extends unknown[]>(
  fn: (...args: T) => void,
  throttleMs = 50,
) {
  // 실행할 함수의 최신 참조
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // 스로틀 인스턴스를 한 번만 생성
  const throttledFn = useMemo(() => {
    // eslint-disable-next-line react-hooks/refs
    return throttle((...args: T) => {
      fnRef.current(...args);
    }, throttleMs);
  }, [throttleMs]);

  // 타이머 클리어
  useEffect(() => {
    return () => throttledFn.cancel();
  }, [throttledFn]);

  return throttledFn;
}

/**
 * @param fn - 스로틀링 할 함수
 * @param throttleMs - 스로틀링 간격 (millisecond 단위), 기본값 50ms
 */

export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  throttleMs = 50,
): ThrottledFunction<T> {
  let pendingAt = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let savedArgs: T | null = null;
  let savedThis: unknown = undefined;

  const throttled = ((...args: T) => {
    const now = Date.now();
    const remain = throttleMs - (now - pendingAt);

    // 이전 호출이 아직 유효한 경우, 마지막 인자와 this를 저장
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    savedThis = this;
    savedArgs = args;

    // 실행
    if (remain <= 0 || pendingAt === 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      pendingAt = now;
      fn.apply(this, args);
      savedArgs = null;
      savedThis = undefined;
    }
    // 타이머 설정
    else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        pendingAt = Date.now();
        timeoutId = null;
        if (savedArgs) {
          fn.apply(savedThis, savedArgs);
          savedArgs = null;
          savedThis = undefined;
        }
      }, remain);
    }
  }) as ThrottledFunction<T>;

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    pendingAt = 0;
    savedArgs = null;
  };

  return throttled;
}

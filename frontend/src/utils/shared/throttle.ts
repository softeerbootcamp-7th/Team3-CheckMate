type ThrottledFunction<T extends unknown[]> = ((...args: T) => void) & {
  cancel: () => void;
};

export function throttle<T extends unknown[]>(
  fn: (...args: T) => void,
  throttleMs = 50,
): ThrottledFunction<T> {
  let pendingAt = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let savedArgs: T | null = null;

  const throttled = ((...args: T) => {
    const now = Date.now();
    const remain = throttleMs - (now - pendingAt);

    // 이전 호출이 아직 유효한 경우
    savedArgs = args;

    // 실행
    if (remain <= 0 || pendingAt === 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      pendingAt = now;
      fn(...args);
      savedArgs = null;
    }
    // 타이머 설정
    else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        pendingAt = Date.now();
        timeoutId = null;
        if (savedArgs) {
          fn(...savedArgs);
          savedArgs = null;
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

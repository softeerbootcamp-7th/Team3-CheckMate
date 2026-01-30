import { useEffect } from 'react';

export const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) {
      return;
    }

    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [lock]);
};

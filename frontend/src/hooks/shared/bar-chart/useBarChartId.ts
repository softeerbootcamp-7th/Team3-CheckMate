import { useId } from 'react';

export const useBarChartId = () => {
  const titleId = useId();
  const descId = useId();

  return {
    titleId,
    descId,
  };
};

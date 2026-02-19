import { useId } from 'react';

export const useBarLineChartId = () => {
  const titleId = useId();
  const descId = useId();
  const lineGradientId = useId();

  return {
    titleId,
    descId,
    lineGradientId,
  };
};

import { useId } from 'react';

export const useLineChartId = () => {
  const lineGradientId = useId();
  const backgroundGradientId = useId();
  const titleId = useId();
  const descId = useId();

  return {
    lineGradientId,
    backgroundGradientId,
    titleId,
    descId,
  };
};

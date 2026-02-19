import { LINE_CHART } from '@/constants/shared';

interface LineChartGradientProps {
  lineGradientId: string;
  backgroundGradientId?: string;
}

export const LineChartGradient = ({
  lineGradientId,
  backgroundGradientId,
}: LineChartGradientProps) => {
  const { GRADIENT_COLOR } = LINE_CHART;

  return (
    <defs>
      <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={GRADIENT_COLOR} stopOpacity="0.3" />
        <stop offset="75%" stopColor={GRADIENT_COLOR} stopOpacity="0.3" />
        <stop offset="100%" stopColor={GRADIENT_COLOR} stopOpacity="0.7" />
      </linearGradient>
      {backgroundGradientId && (
        <linearGradient
          id={backgroundGradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={GRADIENT_COLOR} stopOpacity="0" />
          <stop offset="73.97%" stopColor={GRADIENT_COLOR} stopOpacity="0.03" />
          <stop offset="100%" stopColor={GRADIENT_COLOR} stopOpacity="0.06" />
        </linearGradient>
      )}
    </defs>
  );
};

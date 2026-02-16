import { LINE_CHART } from '@/constants/shared';
import { cn } from '@/utils/shared';

interface DotProps {
  x: number;
  y: number;
  color: string;
  hasHoverEffect?: boolean;
  ariaLabel: string;
  className?: string;
}

export const Dot = ({
  x,
  y,
  color,
  ariaLabel,
  hasHoverEffect = false,
  className,
}: DotProps) => {
  const { DOT_RADIUS } = LINE_CHART;

  return (
    <circle
      cx={x}
      cy={y}
      r={DOT_RADIUS}
      fill={color}
      stroke="none"
      role="graphics-symbol"
      tabIndex={-1}
      aria-label={ariaLabel}
      className={cn(
        hasHoverEffect && 'hover:brightness-75 hover:saturate-200',
        className,
      )}
      style={{
        transition: 'cx 0.5s ease-in-out, cy 0.5s ease-in-out',
      }}
    />
  );
};

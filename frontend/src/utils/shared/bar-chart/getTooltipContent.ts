interface GetTooltipContentProps {
  tooltipContent?: (...args: string[]) => string;
  label: string;
  percentage: number;
  totalAmount: number;
}

export const getTooltipContent = ({
  tooltipContent,
  label,
  percentage,
  totalAmount,
}: GetTooltipContentProps) => {
  if (tooltipContent) {
    return tooltipContent(
      label,
      `${Math.round((percentage / 100) * totalAmount)}건`,
      '(',
      `${percentage}%`,
      ')',
    );
  }
  return null;
};

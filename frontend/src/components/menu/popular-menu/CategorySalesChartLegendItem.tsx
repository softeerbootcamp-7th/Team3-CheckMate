import { formatNumber } from '@/utils/shared/formatNumber';

interface CategorySalesChartLegendItemProps {
  label: string;
  value: number;
  color?: string;
}
export const CategorySalesChartLegendItem = ({
  label,
  value,
  color,
}: CategorySalesChartLegendItemProps) => {
  return (
    <li className="flex justify-between">
      <div className="flex w-fit shrink-0 items-center gap-2">
        <div
          className="rounded-50 inline-block size-3.5 shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="body-small-medium text-grey-900 shrink-0">
          {label}
        </span>
      </div>
      <span className="body-small-medium text-grey-900">
        {formatNumber(value)}원
      </span>
    </li>
  );
};

import { SelectItem } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface SalesClosingTimeSelectItemProps {
  time: number;
}

const FINAL_SALES_CLOSING_TIME = 23;

export const SalesClosingTimeSelectItem = ({
  time,
}: SalesClosingTimeSelectItemProps) => {
  const formattedTime = `${time.toString()}시`;
  return (
    <SelectItem
      value={`${time.toString()}시`}
      className={cn(
        'body-medium-medium! text-grey-700 bg-grey-100 hover:bg-grey-300 active:bg-grey-500 active:text-grey-50 flex h-9 cursor-pointer items-center justify-center rounded-none',
        time !== FINAL_SALES_CLOSING_TIME && 'border-grey-300 border-b',
      )}
    >
      {formattedTime}
    </SelectItem>
  );
};

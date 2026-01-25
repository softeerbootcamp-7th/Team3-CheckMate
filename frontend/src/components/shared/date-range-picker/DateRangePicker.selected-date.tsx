import { X } from 'lucide-react';

import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface SelectDateProps {
  selectedDate: string;
  resetDate: () => void;
}

const SelectedDate = ({ selectedDate, resetDate }: SelectDateProps) => {
  return (
    <div className="bg-grey-100 rounded-200 flex w-40 items-center justify-between py-250 pr-250 pl-400">
      <span
        className={cn(
          'body-medium-medium',
          selectedDate === '선택' ? 'text-grey-400' : 'text-grey-900',
        )}
      >
        {selectedDate}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="text-grey-600 size-fit"
        onClick={resetDate}
      >
        <X className="size-5" />
      </Button>
    </div>
  );
};

interface DateRangePickerSelectedDateProps {
  selectedDate: string;
  resetDate: () => void;
  label: string;
}

export const DateRangePickerSelectedDate = ({
  selectedDate,
  resetDate,
  label,
}: DateRangePickerSelectedDateProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="body-small-medium text-grey-900">{label}</span>
      <SelectedDate selectedDate={selectedDate} resetDate={resetDate} />
    </div>
  );
};

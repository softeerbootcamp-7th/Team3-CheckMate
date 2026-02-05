import { Select, SelectContent } from '@/components/shared/shadcn-ui';
import { useStoreClosingTime } from '@/hooks/onboarding/store-register';

import { SalesClosingTimeSelectItem } from './SalesClosingTimeSelectItem';
import { SalesClosingTimeSelectTrigger } from './SalesClosingTimeSelectTrigger';

const SALES_CLOSING_TIME_LIST = Array.from({ length: 24 }, (_, index) => index);

export const SalesClosingTimeSelect = () => {
  const { isOpen, handleOpenChange, value, handleSelectClosingTime } =
    useStoreClosingTime();

  return (
    <Select
      open={isOpen}
      onOpenChange={handleOpenChange}
      defaultValue="0시"
      value={`${value}시`}
      onValueChange={handleSelectClosingTime}
    >
      <SalesClosingTimeSelectTrigger isOpen={isOpen} />
      <SelectContent
        position="popper"
        className="h-54 w-25.5 overflow-y-auto border-none"
      >
        {SALES_CLOSING_TIME_LIST.map((time) => (
          <SalesClosingTimeSelectItem key={time} time={time} />
        ))}
      </SelectContent>
    </Select>
  );
};

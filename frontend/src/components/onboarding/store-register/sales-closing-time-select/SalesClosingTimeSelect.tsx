import { useState } from 'react';

import { Select, SelectContent } from '@/components/shared/shadcn-ui';

import { SalesClosingTimeSelectItem } from './SalesClosingTimeSelectItem';
import { SalesClosingTimeSelectTrigger } from './SalesClosingTimeSelectTrigger';

const SALES_CLOSING_TIME_LIST = Array.from({ length: 24 }, (_, index) => index);

export const SalesClosingTimeSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Select open={isOpen} onOpenChange={handleOpenChange} defaultValue="0시">
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

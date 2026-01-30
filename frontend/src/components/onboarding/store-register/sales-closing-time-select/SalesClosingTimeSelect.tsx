import { useCallback, useMemo, useState } from 'react';

import { Select, SelectContent } from '@/components/shared/shadcn-ui';

import { SalesClosingTimeSelectItem } from './SalesClosingTimeSelectItem';
import { SalesClosingTimeSelectTrigger } from './SalesClosingTimeSelectTrigger';

export const SalesClosingTimeSelect = () => {
  const salesClosingTimeList = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => index);
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  return (
    <Select open={isOpen} onOpenChange={handleOpenChange} defaultValue="0시">
      <SalesClosingTimeSelectTrigger isOpen={isOpen} />
      <SelectContent position="popper" className="h-54 border-none">
        {salesClosingTimeList.map((time) => (
          <SalesClosingTimeSelectItem key={time} time={time} />
        ))}
      </SelectContent>
    </Select>
  );
};

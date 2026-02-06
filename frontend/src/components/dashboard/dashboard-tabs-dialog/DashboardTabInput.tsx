import type { ChangeEvent, KeyboardEvent, Ref } from 'react';

import { Input } from '@/components/shared';
import { cn } from '@/utils/shared';

const DUPLICATE_ERROR_MESSAGE = '중복된 이름입니다.';

interface DashboardTabInputProps {
  index: number;
  newTabs: (string | undefined)[];
  handleChange: (index: number, value: string) => void;
  editingIndex: number | null;
  setEditingIndex: (index: number | null) => void;
  ref: Ref<HTMLInputElement | null>;
}

export const DashboardTabInput = ({
  index,
  newTabs,
  handleChange,
  editingIndex,
  setEditingIndex,
  ref,
}: DashboardTabInputProps) => {
  const hasDuplicate = newTabs.some(
    (tab, i) =>
      tab?.trim() && i !== index && tab.trim() === newTabs[index]?.trim(),
  );

  return (
    <Input
      ref={ref}
      value={newTabs[index] ?? ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        handleChange(index, e.target.value);
      }}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          setEditingIndex(null);
        }
      }}
      disabled={index !== editingIndex}
      isError={hasDuplicate}
      errorMessagePosition="right"
      errorMessage={DUPLICATE_ERROR_MESSAGE}
      errorClassName="body-small-medium"
      onBlur={() => setEditingIndex(null)}
      maxLength={6}
      inputClassName={cn(
        'rounded-150 bg-grey-0 body-medium-semibold text-grey-900 w-42.5 p-200 focus:bg-grey-100 ',
        !hasDuplicate && 'focus:outline-none',
      )}
    />
  );
};

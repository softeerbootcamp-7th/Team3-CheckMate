import { type ChangeEvent, type KeyboardEvent, type Ref } from 'react';

import { Input } from '@/components/shared';
import { cn } from '@/utils/shared';

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
  const hasDuplicate =
    newTabs.filter(
      (tab, i) =>
        tab &&
        tab.trim() &&
        tab.trim() === newTabs[index]?.trim() &&
        i !== index,
    ).length > 0;

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
      errorMessage="중복된 이름입니다."
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

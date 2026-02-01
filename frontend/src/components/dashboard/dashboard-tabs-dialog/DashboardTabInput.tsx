import type { ChangeEvent, Ref } from 'react';

import { Input } from '@/components/shared';

interface DashboardTabInputProps {
  index: number;
  newTabs: string[];
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
  return (
    <Input
      ref={ref}
      value={newTabs[index] ?? ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleChange(index, e.target.value)
      }
      disabled={index !== editingIndex}
      isError={
        // 중복
        newTabs.filter(
          (tab, i) =>
            tab === newTabs[index] && tab.trim() !== '' && i !== index,
        ).length > 0
      }
      errorMessagePosition="right"
      errorMessage="중복된 이름입니다."
      errorClassName="body-small-medium"
      onBlur={() => setEditingIndex(null)}
      maxLength={6}
      // TODO error & focus 시 테두리 안 나옴
      inputClassName="rounded-150 bg-grey-0 body-medium-semibold text-grey-900 w-42.5 p-200 focus:bg-grey-100 focus:outline-none"
    />
  );
};

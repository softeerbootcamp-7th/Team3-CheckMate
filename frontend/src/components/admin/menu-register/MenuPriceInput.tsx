import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@/components/shared';
import type { MenuRegisterForm } from '@/types/menu';

export const MenuPriceInput = () => {
  const { control } = useFormContext<MenuRegisterForm>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'price',
    control,
    rules: {
      required: {
        value: true,
        message: '메뉴 가격을 입력해주세요.',
      },
    },
    defaultValue: undefined,
  });

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value.startsWith('0')) {
      field.onChange(value.slice(1));
      return;
    }
    field.onChange(value);
  };

  return (
    <div className="relative">
      <Input
        id="메뉴 가격"
        placeholder="0"
        label="메뉴 가격"
        isError={!!error}
        errorMessage={error?.message}
        inputMode="numeric"
        {...field}
        onChange={handlePriceChange}
        inputClassName="no-spinner bg-grey-0 h-12 pr-8 text-right"
      />
      <span className="body-medium-semibold text-grey-600 absolute right-4 bottom-3">
        원
      </span>
    </div>
  );
};

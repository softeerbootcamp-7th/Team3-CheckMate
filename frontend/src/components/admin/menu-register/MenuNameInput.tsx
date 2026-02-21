import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@/components/shared';
import type { MenuRegisterForm } from '@/types/menu';

export const MenuNameInput = () => {
  const { control } = useFormContext<MenuRegisterForm>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'name',
    control,
    rules: {
      required: {
        value: true,
        message: '메뉴 이름을 입력해주세요.',
      },
    },
    defaultValue: '',
  });

  return (
    <Input
      id="메뉴 이름"
      placeholder="예) 아메리카노"
      inputClassName="bg-grey-0 mt-2 h-12"
      label="메뉴 이름"
      isError={!!error}
      errorMessage={error?.message}
      {...field}
    />
  );
};

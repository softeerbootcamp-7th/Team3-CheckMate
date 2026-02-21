import { useController, useFormContext } from 'react-hook-form';

import { Input } from '@/components/shared';
import type { MenuRegisterForm } from '@/types/menu';

export const MenuCategoryInput = () => {
  const { control } = useFormContext<MenuRegisterForm>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: 'category',
    control,
    rules: {
      required: {
        value: true,
        message: '메뉴 카테고리를 입력해주세요.',
      },
    },
    defaultValue: '',
  });

  return (
    <Input
      id="메뉴 카테고리"
      placeholder="예) 커피, 디저트"
      inputClassName="bg-grey-0 mt-2 h-12"
      label="메뉴 카테고리"
      isError={!!error}
      errorMessage={error?.message}
      {...field}
    />
  );
};

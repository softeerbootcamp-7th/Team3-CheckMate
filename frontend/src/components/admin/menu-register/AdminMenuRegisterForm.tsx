import type { BaseSyntheticEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import type { MenuRegisterForm } from '@/types/menu';

import { MenuCategoryInput } from './MenuCategoryInput';
import { MenuNameInput } from './MenuNameInput';
import { MenuPriceInput } from './MenuPriceInput';
import { MenuRegisterButton } from './MenuRegisterButton';

interface AdminMenuRegisterFormProps {
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
}

export const AdminMenuRegisterForm = ({
  handleSubmit,
}: AdminMenuRegisterFormProps) => {
  const {
    formState: { isValid },
  } = useFormContext<MenuRegisterForm>();

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <section className="border-grey-300 border-b px-6 py-5">
        <h2 className="title-small text-grey-900 font-semibold">
          신규 메뉴 등록
        </h2>
        <p className="body-medium-medium text-grey-600 mt-2">
          새로운 메뉴의 정보를 입력해주세요.
        </p>
      </section>
      <section className="space-y-6 px-6 py-6">
        <MenuNameInput />
        <MenuCategoryInput />
        <MenuPriceInput />
      </section>

      <section className="border-grey-300 mt-auto border-t px-6 py-6">
        <MenuRegisterButton disabled={!isValid} />
      </section>
    </form>
  );
};

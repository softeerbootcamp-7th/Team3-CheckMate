import { Plus } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import type { IngredientField } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { IngredientQuestionIconWithTooltip } from './IngredientQuestionIconWithTooltip';

interface IngredientEditInfoHeaderProps {
  fields: IngredientField[];
  onClickAddIngredient: () => void;
}

export const IngredientEditInfoHeader = ({
  fields,
  onClickAddIngredient,
}: IngredientEditInfoHeaderProps) => {
  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-[6px]">
          <span className="title-medium-semibold text-grey-900">
            식재료 입력
          </span>
          <IngredientQuestionIconWithTooltip />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            className={cn(
              fields.length === 0
                ? 'text-brand-500 border-brand-500'
                : 'text-grey-300 border-grey-300 pointer-events-none',
              'rounded-200 h-8.5 w-23.5 border-[1.5px] px-350 py-200',
            )}
          >
            AI 자동완성
          </Button>
          {fields.length !== 0 && (
            <span className="body-small-medium text-grey-700">
              AI 자동완성은 입력된 식재료가 없을 때만 사용할 수 있어요.
            </span>
          )}
        </div>
      </div>
      <Button
        onClick={onClickAddIngredient}
        type="button"
        className="rounded-200 bg-grey-200 text-grey-700 flex h-9.5 gap-[6px] border-[1.5px] border-none px-350 py-200"
      >
        <Plus className="size-5" />
        식재료 추가
      </Button>
    </header>
  );
};

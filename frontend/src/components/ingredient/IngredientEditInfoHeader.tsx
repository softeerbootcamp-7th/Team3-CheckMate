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
        <div className="flex items-center gap-1.5">
          <span className="title-medium-semibold text-grey-900">
            식재료 입력
          </span>
          <IngredientQuestionIconWithTooltip />
        </div>

        <div className="flex items-center gap-4">
          <Button
            disabled={fields.length !== 0} // AI 추천 생성 중일 때 or 목록에 식자재 있을때는 비활성화 -> 클릭 불가
            type="button"
            className={cn(
              'rounded-200 h-8.5 w-23.5 border-[1.5px] border-transparent px-350 py-200',
              '[background-clip:padding-box,border-box] bg-origin-border',
              'bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#C263FF,#17C4FF,#44C4F5)]',
              fields.length !== 0 && 'border-grey-300',
            )}
          >
            <span
              className={cn(
                'bg-[linear-gradient(to_right,#C263FF,#17C4FF,#44C4F5)] bg-clip-text text-transparent',
                fields.length !== 0 && 'text-grey-300',
              )}
            >
              AI 자동완성
            </span>
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

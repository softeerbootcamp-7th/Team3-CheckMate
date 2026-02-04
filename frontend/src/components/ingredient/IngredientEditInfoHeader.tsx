import { CircleQuestionMark, Plus } from 'lucide-react';

import type { FormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../shared/shadcn-ui/tooltip';

interface IngredientEditInfoHeaderProps {
  fields: FormValues['ingredients'];
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
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMark className="text-grey-500 size-6" />
            </TooltipTrigger>
            <TooltipContent
              className="bg-grey-900 [&_svg]:fill-grey-900 body-small-medium rounded-250 flex translate-x-24 flex-col gap-1 px-350 py-300 leading-[22px] [&_svg]:translate-x-24 [&_svg]:-translate-y-[2px] [&_svg]:rotate-0"
              side={'bottom'}
            >
              <p className="text-grey-400">Q. 메뉴별 식재료는 왜 수집하나요?</p>
              <p className="text-grey-100">
                사장님께서 식재료 재고를 직접 확인하지 않으셔도,
                <br />
                식재료 소진 정도를 모니터링해 알려드리고자 수집해요.
              </p>
            </TooltipContent>
          </Tooltip>
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

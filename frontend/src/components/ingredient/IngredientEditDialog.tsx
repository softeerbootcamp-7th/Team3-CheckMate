import { useFieldArray, useForm } from 'react-hook-form';

import { CircleQuestionMark, Plus, X } from 'lucide-react';

import { cn } from '@/utils/shared';

import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../shared/shadcn-ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../shared/shadcn-ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../shared/shadcn-ui/tooltip';

import { IngredientUnitSelectItem } from './IngredientUnitSelectItem';

interface IngredientEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
}

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

export const IngredientEditDialog = ({
  open,
  onOpenChange,
}: IngredientEditDialogProps) => {
  const mockMenuIngredients = {
    id: '1',
    menu: '딸기 스무디',
    ingredients: [
      { id: '1', name: '딸기', amount: '200', unit: 'g' },
      { id: '2', name: '우유', amount: '120', unit: 'ml' },
      { id: '3', name: '딸기시럽', amount: '10', unit: 'ml' },
    ],
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: { ingredients: mockMenuIngredients.ingredients },
  });

  const onClickDeleteIngredient = (index: number) => {
    remove(index);
  };
  const onClickAddIngredient = () => {
    append({ id: '', name: '', amount: '', unit: '' });
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients', // 필드 배열 이름
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-500 h-175 !w-[1000px] !max-w-[1000px] gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
        <form className="flex h-full w-full flex-col">
          <DialogHeader className="flex w-full flex-row items-center justify-between self-start">
            <DialogTitle className="!title-large-semibold text-grey-900">
              {mockMenuIngredients.menu}
            </DialogTitle>
            <div className="flex gap-[14px]">
              <Button
                type="button"
                className="body-medium-semibold w-20 border-none px-350 py-200 focus:ring-0"
                onClick={() => onOpenChange(false)}
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit(() => {})}
                className={cn(
                  isDirty
                    ? 'bg-grey-900 text-grey-50'
                    : 'bg-grey-200 text-grey-400',
                  'body-medium-bold w-20 border-none px-350 py-200',
                )}
              >
                저장
              </Button>
            </div>
          </DialogHeader>

          <div className="bg-grey-300 mt-5.5 h-[2px]" />
          <section className="mt-10 flex flex-1 flex-col gap-10">
            <header className="flex justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-[6px]">
                  <span className="title-medium-semibold text-grey-900">
                    식재료 입력
                  </span>
                </div>

                <Button
                  type="button"
                  className={cn(
                    fields.length === 0
                      ? 'text-grey-300 border-grey-300'
                      : 'text-brand-500 border-brand-500',
                    'rounded-200 h-8.5 border-[1.5px] px-350 py-200',
                  )}
                >
                  AI 자동완성
                </Button>
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
            <div className="flex-1 overflow-y-scroll">
              {fields.length === 0 ? (
                <div className="text-grey-500 flex h-full items-center justify-center pb-10">
                  메뉴 제조에 필요한 식재료를 등록해주세요
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-14 gap-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-[10px]"
                    >
                      <input
                        {...register(`ingredients.${index}.name`)}
                        placeholder="식재료명"
                        className="bg-grey-200 rounded-200 w-53 p-250 focus:outline-none"
                      />
                      <input
                        {...register(`ingredients.${index}.amount`)}
                        placeholder="용량"
                        className="bg-grey-200 rounded-200 w-20 p-250 focus:outline-none"
                      />

                      <Select>
                        <SelectTrigger
                          className={
                            'bg-grey-200 rounded-150 body-medium-semibold !h-full !w-[76px] shrink-0 gap-0 border-none px-250 py-200'
                          }
                        >
                          <div
                            className={cn(
                              field.unit ? 'text-grey-900' : 'text-grey-400',
                              'flex h-full w-full items-center justify-center',
                            )}
                          >
                            <SelectValue
                              placeholder={
                                field.unit ? `${field.unit}` : '단위'
                              }
                            />
                          </div>
                        </SelectTrigger>
                        <SelectContent
                          {...register(`ingredients.${index}.unit`)}
                          className="border-grey-300 min-w-0 border bg-gray-100"
                          position={'popper'}
                        >
                          <SelectGroup>
                            <IngredientUnitSelectItem unit="ml" />
                            <SelectSeparator />
                            <IngredientUnitSelectItem unit="L" />
                            <SelectSeparator />
                            <IngredientUnitSelectItem unit="g" />
                            <SelectSeparator />
                            <IngredientUnitSelectItem unit="kg" />
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Button
                        className="!P-0 text-grey-600"
                        type="button"
                        onClick={() => {
                          onClickDeleteIngredient(index);
                        }}
                      >
                        <X className="size-6" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { CircleQuestionMark, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

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
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: { ingredients: mockMenuIngredients.ingredients },
  });

  const onClickDeleteIngredient = (index: number) => {
    remove(index);
  };
  const onClickAddIngredient = () => {
    append({ id: '', name: '', amount: '', unit: '' });
  };

  const onSubmit = (data) => console.log(data);
  const onError = (errors) => {
    console.log(errors);
    toast(
      '입력이 덜 된 식재료는 저장할 수 없어요. 모두 입력하거나 삭제해 주세요',
      {
        className:
          '!bg-grey-900 !text-grey-50 !border-none !max-w-auto !w-max body-small-semibold px-400',
        position: 'bottom-center',
      },
    );
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-500 h-175 !w-[1000px] !max-w-[1000px] gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
        <form className="flex h-full min-h-0 w-full flex-col">
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
                onClick={handleSubmit(onSubmit, onError)}
                className={cn(
                  isDirty
                    ? 'bg-grey-900 text-grey-50'
                    : 'bg-grey-200 text-grey-400 pointer-events-none',
                  'body-medium-bold w-20 border-none px-350 py-200',
                )}
              >
                저장
              </Button>
            </div>
          </DialogHeader>

          <div className="bg-grey-300 mt-5.5 h-[2px]" />
          <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
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
                      <p className="text-grey-400">
                        Q. 메뉴별 식재료는 왜 수집하나요?
                      </p>
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
            <main className="flex-1 overflow-y-auto p-1">
              {fields.length === 0 ? (
                <div className="text-grey-500 flex h-full items-center justify-center pb-10">
                  메뉴 제조에 필요한 식재료를 등록해주세요
                </div>
              ) : (
                <div className="body-medium-semibold grid auto-rows-[42px] grid-cols-2 gap-x-12 gap-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex h-full items-center gap-2.5"
                    >
                      <input
                        {...register(`ingredients.${index}.name`, {
                          required: true,
                          maxLength: 10,
                          onBlur: (e) => {
                            // 사용자가 입력 마치고 다른 영역 클릭했을 때 실행되는 함수
                            e.target.value = e.target.value.trim();
                          },
                        })}
                        placeholder="식재료명"
                        className={cn(
                          errors.ingredients?.[index]?.name
                            ? 'border-others-negative'
                            : 'border-transparent',
                          'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 flex-1 border p-250 focus:outline-none',
                        )}
                      />
                      <input
                        {...register(`ingredients.${index}.amount`, {
                          required: true,
                          maxLength: 5,
                          pattern: /^[0-9]*$/,
                        })}
                        placeholder="용량"
                        className={cn(
                          errors.ingredients?.[index]?.amount
                            ? 'border-others-negative'
                            : 'border-transparent',
                          'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 w-20 border p-250 text-center focus:outline-none',
                        )}
                      />

                      <Controller
                        name={`ingredients.${index}.unit`}
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => {
                          return (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className={cn(
                                  errors.ingredients?.[index]?.unit
                                    ? 'border-others-negative'
                                    : 'border-transparent',
                                  'bg-grey-200 rounded-150 !h-10.5 !w-19 shrink-0 gap-0 border px-250 py-200',
                                )}
                              >
                                <div
                                  className={cn(
                                    field.value
                                      ? 'text-grey-900'
                                      : 'text-grey-400',
                                    'flex h-full w-full items-center justify-center',
                                  )}
                                >
                                  <SelectValue
                                    placeholder={
                                      field.value ? `${field.value}` : '단위'
                                    }
                                  />
                                </div>
                              </SelectTrigger>
                              <SelectContent
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
                          );
                        }}
                      />

                      <Button
                        className="!P-0 text-grey-600 size-6"
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
            </main>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

import { X } from 'lucide-react';

import type { FormValues } from '@/types/ingredient';
import { cn } from '@/utils/shared';

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../shared/shadcn-ui';

import { IngredientUnitSelectItem } from './IngredientUnitSelectItem';

interface IngredientGridProps {
  fields: FormValues['ingredients'];
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
  isRowEmpty: (index: number) => boolean;
  onClickDeleteIngredient: (index: number) => void;
}

export const IngredientGrid = ({
  fields,
  register,
  errors,
  control,
  isRowEmpty,
  onClickDeleteIngredient,
}: IngredientGridProps) => {
  return (
    <main className="flex-1 overflow-y-auto p-1">
      {fields.length === 0 ? (
        <div className="text-grey-500 flex h-full items-center justify-center pb-10">
          메뉴 제조에 필요한 식재료를 등록해주세요
        </div>
      ) : (
        <div className="!body-medium-semibold grid auto-rows-[42px] grid-cols-2 gap-x-12 gap-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex h-full items-center gap-2.5">
              <Input
                autoComplete="off"
                maxLength={10} // 태그 자체 글자수 제한 기능
                {...register(`ingredients.${index}.name`, {
                  maxLength: 10,
                  onBlur: (e) => {
                    // 사용자가 입력 마치고 다른 영역 클릭했을 때 실행되는 함수 -> 앞뒤 공백 제거
                    e.target.value = e.target.value.trim();
                  },
                  validate: (currentFieldValue) => {
                    // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
                    if (isRowEmpty(index)) {
                      return true;
                    }
                    // 식자재명은 반드시 입력되어야 함
                    return currentFieldValue.length > 0;
                  },
                })}
                placeholder="식재료명"
                className={cn(
                  errors.ingredients?.[index]?.name
                    ? 'border-others-negative'
                    : 'border-transparent',
                  'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 flex-1 border p-250',
                )}
              />
              <Input
                autoComplete="off"
                maxLength={5}
                {...register(`ingredients.${index}.amount`, {
                  validate: (currentFieldValue) => {
                    // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
                    if (isRowEmpty(index)) {
                      return true;
                    }
                    // 용량은 반드시 입력되어야 함
                    return currentFieldValue.length > 0;
                  },
                })}
                onInput={(e) => {
                  // 숫자만 입력되도록 실시간 필터링 -> 검증때만 입력 불가가 아니라 애초에 입력 불가능하게
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g, // /: 정규식 시작과 끝 , ^ : 부정, g: 모든 문자에 적용
                    '',
                  );
                }}
                placeholder="용량"
                className={cn(
                  errors.ingredients?.[index]?.amount
                    ? 'border-others-negative'
                    : 'border-transparent',
                  'bg-grey-200 rounded-200 placeholder:text-grey-400 h-10.5 w-20 border p-250 text-center',
                )}
              />

              <Controller
                name={`ingredients.${index}.unit`}
                control={control}
                rules={{
                  validate: (currentFieldValue) => {
                    // 한 행의 모든 값 비어있으면 오류 발생 안시키고 검증 통과
                    if (isRowEmpty(index)) {
                      return true;
                    }
                    // 단위는 반드시 선택되어야 함
                    return currentFieldValue.length > 0;
                  },
                }}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
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
                            field.value ? 'text-grey-900' : 'text-grey-400',
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
  );
};

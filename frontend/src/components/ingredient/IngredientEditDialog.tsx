import { type FieldErrors, FormProvider } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Dialog, DialogContent } from '@/components/shared/shadcn-ui';
import { useIngredientForm } from '@/hooks/ingredient';
import { postAiIngredientRecommend } from '@/services/ ingredient';
import type {
  IngredientFormValues,
  PostAiIngredientRecommendResponseDto,
} from '@/types/ingredient';

import { IngredientEditDialogHeader } from './IngredientEditDialogHeader';
import { IngredientEditInfoHeader } from './IngredientEditInfoHeader';
import { IngredientGrid } from './IngredientGrid';

interface IngredientEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
}

export const IngredientEditDialog = ({
  open,
  onOpenChange,
}: IngredientEditDialogProps) => {
  const mockMenuIngredients = {
    id: '1',
    menu: '딸기 스무디',
    ingredients: [
      { ingredientId: '1', name: '딸기', amount: '200', unit: 'g' },
      { ingredientId: '2', name: '우유', amount: '120', unit: 'ml' },
      { ingredientId: '3', name: '딸기시럽', amount: '10', unit: 'ml' },
    ],
  };
  const { formMethods, fieldArrayMethods, isIngredientRowEmpty } =
    useIngredientForm({
      ingredientFormValues: { ingredients: mockMenuIngredients.ingredients },
    });

  const {
    mutate,
    isPending: isAiRecommendPending,
    // isError,
    // isSuccess,
  } = useMutation({
    mutationFn: postAiIngredientRecommend,
    onSuccess: (data: PostAiIngredientRecommendResponseDto) => {
      // 성공하면 받아온 데이터 폼에 넣기
      // AI 자동완성은 식자재 필드에 아무 값도 없을때만 가능 -> 필드 청소할 필요 없이 그냥 append만 해주면 됨
      data.ingredients.forEach((ingredient) => {
        fieldArrayMethods.append(ingredient);
      });
    },
    onMutate: () => {},
    onError: () => {
      toast('식재료 자동완성에 실패했어요. 다시 시도해 주세요.', {
        position: 'bottom-center',
      });
    },
    onSettled: () => {},
  });

  const onClickDeleteIngredient = (index: number) => {
    fieldArrayMethods.remove(index);
  };
  const onClickAddIngredient = () => {
<<<<<<< HEAD
    fieldArrayMethods.append({ name: '', amount: '', unit: '' });
=======
    fieldArrayMethods.append({
      ingredientId: '',
      name: '',
      amount: '',
      unit: '',
    });
>>>>>>> 1a87e26 (feat: 자동으로 식별용 id값 붙여주는 fieldArray 특성에 맞게 id 속성 추가된 새로운 타입 정의 및 사용)
  };

  const onClickSubmit = async () =>
    //data: FormValues
    {
      // fetch() : fetch 작업 하기
      onOpenChange(false); // 다이얼로그 닫기
    };
  const onClickCancel = () => {
    onOpenChange(false);
  };
  const onError = (errors: FieldErrors<IngredientFormValues>) => {
    toast(
      '입력이 덜 된 식재료는 저장할 수 없어요. 모두 입력하거나 삭제해 주세요',
      {
        duration: 3500, // 3.5초 동안 띄워져있음
        className:
          '!bg-grey-900 !text-grey-50 !border-none !max-w-auto !w-max body-small-semibold px-400',
        position: 'bottom-center',
      },
    );
    return errors; // 그냥 임시 return. 사용하는 데는 없음
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FormProvider {...formMethods}>
        <form>
          <DialogContent className="rounded-500 flex h-175 !w-[1000px] !max-w-[1000px] flex-col gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
            {/** 메뉴명과 취소, 저장 버튼 있는 행 */}
            <IngredientEditDialogHeader
              onClickSubmit={onClickSubmit}
              onClickCancel={onClickCancel}
              onError={onError}
              menuName={mockMenuIngredients.menu}
            />

            <div className="bg-grey-300 mt-5.5 h-[2px]" />
            <section className="mt-10 flex min-h-0 flex-1 flex-col gap-10">
              {/** 식재료 목록 영역 위 식재료 입력 관련 정보 및 버튼 행(AI자동완성, 식재료추가 버튼 등) */}
              <IngredientEditInfoHeader
                isAiRecommendPending={isAiRecommendPending}
                fields={fieldArrayMethods.fields}
                onClickAddIngredient={onClickAddIngredient}
                onClickAiIngredientRecommend={() => {
                  mutate({ menu: mockMenuIngredients.menu });
                }}
              />

              {/** 식재료 목록 나오는 그리드 영역 */}
              <IngredientGrid
                isPending={isAiRecommendPending}
                fields={fieldArrayMethods.fields}
                isIngredientRowEmpty={isIngredientRowEmpty}
                onClickDeleteIngredient={onClickDeleteIngredient}
              />
            </section>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
};

import { FormProvider, useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { DefaultCardFetchBoundary } from '@/components/shared';
import { Dialog, DialogContent } from '@/components/shared/shadcn-ui';
import { useIngredientEditSubmit } from '@/hooks/ingredient';
import type { IngredientFormValues } from '@/types/ingredient';

import { IngredientEditDialogHeader } from './IngredientEditDialogHeader';
import { IngredientEditDialogMain } from './IngredientEditDialogMain';
interface IngredientEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: number;
  menuName: string;
  hasIngredients: boolean; // 메뉴에 등록된 식자재 유무. -> false면 폼 제출 시 post, true면 put 요청 보내야 함
}

export const IngredientEditDialog = ({
  open,
  onOpenChange,
  menuId,
  menuName,
  hasIngredients,
}: IngredientEditDialogProps) => {
  // 우선 폼 생성
  const formMethods = useForm<IngredientFormValues>({
    defaultValues: { ingredients: [] }, // 초기값은 빈 배열로 설정
    mode: 'onBlur',
  });

  // 취소 버튼 누르면 모달 창 닫기
  const onClickCancel = () => {
    onOpenChange(false);
    formMethods.reset(); // 폼 초기화
  };
  // 폼 validation 통과했을 때 실행되는 함수
  const { onSubmit, isSubmitting } = useIngredientEditSubmit({
    menuId,
    onOpenChange,
    hasIngredients,
  });
  // 폼 validation 실패 했을 때 불리는 함수
  const onError = () => {
    toast(
      '입력이 덜 된 식재료는 저장할 수 없어요. 모두 입력하거나 삭제해 주세요',
    );
  };

  // 열려있지 않으면 dialog 컴포넌트 렌더링 안되도록
  if (!open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <FormProvider {...formMethods}>
        {/** w-250, max-w-250 이렇게 tailwind 스타일로 하면 width 속성 적용 안됨. w-250은 tailwind에 없음 */}

        <DialogContent className="rounded-500 h-175 w-[1000px]! max-w-[1000px]! gap-0 border-none bg-gray-50 p-12.5 [&>button]:hidden">
          <form
            className="flex h-full min-h-0 flex-col"
            onSubmit={formMethods.handleSubmit(onSubmit, onError)}
          >
            {/** 메뉴명과 취소, 저장 버튼 있는 행 */}
            <IngredientEditDialogHeader
              onClickCancel={onClickCancel}
              menuName={menuName}
              isSubmitting={isSubmitting}
            />
            <div className="bg-grey-300 mt-5.5 h-0.5" />
            {/** 식재료 입력 폼이 있는 메인 영역 */}
            <DefaultCardFetchBoundary className="h-full w-full bg-transparent">
              <IngredientEditDialogMain menuId={menuId} />
            </DefaultCardFetchBoundary>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
};

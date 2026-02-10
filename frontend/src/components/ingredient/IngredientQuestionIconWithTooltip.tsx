import { CircleQuestionMark } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';

// 식재료 입력 옆 물음표 아이콘 툴팁 컴포넌트
export const IngredientQuestionIconWithTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleQuestionMark className="text-grey-500 size-6" />
      </TooltipTrigger>
      <TooltipContent
        className="bg-grey-900 [&_svg]:fill-grey-900 body-small-medium rounded-250 flex translate-x-24 flex-col gap-1 px-350 py-300 leading-5.5 [&_svg]:translate-x-24 [&_svg]:-translate-y-0.5 [&_svg]:rotate-0"
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
  );
};

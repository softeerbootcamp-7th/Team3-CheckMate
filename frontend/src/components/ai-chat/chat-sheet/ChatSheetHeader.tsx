import { memo } from 'react';

import { XIcon } from 'lucide-react';

import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/shadcn-ui/sheet';

export const ChatSheetHeader = memo(() => {
  return (
    <>
      {/* 접근성 description */}
      <SheetDescription className="sr-only">
        AI mate 채팅창이에요. 질문을 입력하거나 추천 질문을 선택할 수 있어요.
      </SheetDescription>

      {/* 헤더 */}
      <SheetHeader className="shrink-0 flex-row justify-between p-500">
        <SheetTitle>
          <img
            src="src/assets/images/ai-mate-logo-row.png"
            alt="AI mate 로고"
            className="h-6 object-contain"
          />
        </SheetTitle>
        <SheetClose className="text-grey-600 size-6 cursor-pointer">
          <XIcon className="size-6" />
        </SheetClose>
      </SheetHeader>
    </>
  );
});
ChatSheetHeader.displayName = 'ChatSheetHeader';

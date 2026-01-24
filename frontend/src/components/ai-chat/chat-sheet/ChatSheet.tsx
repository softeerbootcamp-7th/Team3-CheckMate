import { useState } from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/ui/sheet';

import { ChatHistory } from '../chat-history/ChatHistory';
import { ChatQuestionInput } from '../chat-question-input/ChatQuestionInput';
import { ChatStart } from '../chat-start/ChatStart';

export const ChatSheet = () => {
  const [didStartChat, setDidStartChat] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleQuestionSubmit = (question: string) => {
    setDidStartChat(true);

    // TODO: 입력한 질문으로 채팅 시작 로직 추가
    console.info('질문 제출:', question);
  };

  return (
    <Sheet onOpenChange={(open) => open && setDidStartChat(false)}>
      <SheetTrigger asChild>
        <Button className="bg-grey-0 size-18 rounded-full border-none p-350 pb-400 shadow-[0_0_3.6px_0_rgba(0,0,0,0.15),0_3.6px_7.2px_0_rgba(0,0,0,0.08)]">
          <img
            src="/assets/images/ai-mate-logo-col.png"
            alt="AI mate 로고"
            className="h-9.5 w-fit"
          />
        </Button>
      </SheetTrigger>
      <SheetOverlay className="bg-transparent" />
      <SheetContent
        showCloseButton={false}
        side="left"
        className="rounded-500 m-1000 mt-auto h-[600px] w-90 gap-0 border-[2.5px] border-transparent bg-[linear-gradient(#fafbff,#fafbff),linear-gradient(171.25deg,#34aafb_-2.76%,#4eb0f6_12.29%,#73c1fd_38.18%,#009afa_89.66%)] [background-clip:content-box,border-box] bg-origin-border shadow-xl"
      >
        {/* 접근성 description */}
        <SheetDescription className="sr-only">
          AI mate 채팅창이에요. 질문을 입력하거나 추천 질문을 선택할 수 있어요.
        </SheetDescription>
        {/* 헤더 */}
        <SheetHeader className="flex-row justify-between p-500">
          <SheetTitle>
            <img
              src="/assets/images/ai-mate-logo-row.png"
              alt="AI mate 로고"
              className="h-6 w-fit"
            />
          </SheetTitle>
          <SheetClose className="text-grey-600 size-6">
            <XIcon className="size-6" />
          </SheetClose>
        </SheetHeader>

        {/* 채팅 시작 페이지 또는 채팅 히스토리 */}
        {!didStartChat ? (
          <ChatStart onQuestionSelect={handleQuestionSelect} />
        ) : (
          <ChatHistory />
        )}

        <SheetFooter className="p-500 pt-4.5">
          {/* 질문 입력 영역 */}
          <ChatQuestionInput
            selectedQuestion={selectedQuestion}
            onSelectedQuestionProcessed={() => setSelectedQuestion(null)}
            onQuestionSubmit={handleQuestionSubmit}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

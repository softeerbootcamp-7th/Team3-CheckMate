import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetOverlay,
} from '@/components/shared/ui/sheet';
import { useChatState } from '@/hooks/ai-chat';

import { ChatHistory } from '../chat-history/ChatHistory';
import { ChatQuestionInput } from '../chat-question-input/ChatQuestionInput';
import { ChatSheetHeader } from '../chat-sheet-header/ChatSheetHeader';
import { ChatSheetTrigger } from '../chat-sheet-trigger/ChatSheetTrigger';
import { ChatStart } from '../chat-start/ChatStart';

export const ChatSheet = () => {
  const [chatState, { setDidStartChat, setSelectedQuestion }] = useChatState();

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleQuestionSubmit = (question: string) => {
    setDidStartChat(true);

    // TODO: 입력한 질문으로 채팅 시작 로직 추가
    console.info('질문 제출:', question);
  };

  const handleChatReset = () => {
    setDidStartChat(false);
  };

  return (
    <Sheet onOpenChange={(open) => open && handleChatReset()}>
      <ChatSheetTrigger />
      <SheetOverlay className="bg-transparent" />
      <SheetContent
        showCloseButton={false}
        side="left"
        className="rounded-500 m-1000 mt-auto flex h-[600px] w-90 flex-col gap-0 border-[2.5px] border-transparent bg-[linear-gradient(#fafbff,#fafbff),linear-gradient(171.25deg,#34aafb_-2.76%,#4eb0f6_12.29%,#73c1fd_38.18%,#009afa_89.66%)] [background-clip:content-box,border-box] bg-origin-border shadow-xl"
      >
        <ChatSheetHeader />

        {/* 채팅 시작 페이지 또는 채팅 히스토리 */}
        <div className="min-h-0 flex-1 shrink-0">
          {!chatState.didStartChat ? (
            <ChatStart onQuestionSelect={handleQuestionSelect} />
          ) : (
            <ChatHistory />
          )}
        </div>

        <SheetFooter className="m-500 mt-0 p-0">
          <ChatQuestionInput
            selectedQuestion={chatState.selectedQuestion}
            onSelectedQuestionProcessed={() => setSelectedQuestion(null)}
            onQuestionSubmit={handleQuestionSubmit}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

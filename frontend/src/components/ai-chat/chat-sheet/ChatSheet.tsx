import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetOverlay,
} from '@/components/shared/shadcn-ui/sheet';
import { useChatStream } from '@/hooks/ai-chat';

import { ChatHistory } from '../chat-history';

import { ChatQuestionInput } from './ChatQuestionInput';
import { ChatSheetHeader } from './ChatSheetHeader';
import { ChatSheetTrigger } from './ChatSheetTrigger';
import { ChatStart } from './ChatStart';

export const ChatSheet = () => {
  const [didStartChat, setDidStartChat] = useState<boolean>(false);
  const {
    chatHistoryList,
    isLoading,
    isStreaming,
    submitQuestion,
    cancelChat,
    resetChat,
  } = useChatStream();

  const handleQuestionSelect = (question: string) => {
    handleQuestionSubmit(question);
  };

  const handleQuestionSubmit = (question: string) => {
    setDidStartChat(true);
    submitQuestion(question);
  };

  const handleChatReset = () => {
    setDidStartChat(false);
    resetChat();
  };

  const handleChatCancel = () => {
    cancelChat();
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
          {!didStartChat ? (
            <ChatStart onQuestionSelect={handleQuestionSelect} />
          ) : (
            <ChatHistory
              chatHistoryList={chatHistoryList}
              isLoading={isLoading}
              isStreaming={isStreaming}
            />
          )}
        </div>

        <SheetFooter className="m-500 mt-0 p-0">
          <ChatQuestionInput
            onQuestionSubmit={handleQuestionSubmit}
            onQuestionCancel={handleChatCancel}
            isLoading={isLoading || isStreaming}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

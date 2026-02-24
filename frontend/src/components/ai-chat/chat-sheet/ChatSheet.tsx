import { useCallback, useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetFooter,
} from '@/components/shared/shadcn-ui';
import { useBodyScrollLock, useChatStream } from '@/hooks/ai-chat';

import { ChatHistory } from '../chat-history';
import { ChatStart } from '../chat-start';

import { ChatQuestionInput } from './ChatQuestionInput';
import { ChatSheetHeader } from './ChatSheetHeader';
import { ChatSheetTrigger } from './ChatSheetTrigger';

export const ChatSheet = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [didStartChat, setDidStartChat] = useState<boolean>(false);
  const {
    chatHistoryList,
    lastAnswer,
    isLoading,
    isStreaming,
    submitQuestion,
    cancelChat,
    resetChat,
  } = useChatStream();

  const handleQuestionSubmit = useCallback(
    (question: string) => {
      setDidStartChat(true);
      submitQuestion(question);
    },
    [submitQuestion],
  );
  const handleQuestionSelect = useCallback(
    (question: string) => {
      handleQuestionSubmit(question);
    },
    [handleQuestionSubmit],
  );

  const handleChatReset = () => {
    setDidStartChat(false);
    resetChat();
  };

  const handleChatCancel = useCallback(() => {
    cancelChat();
  }, [cancelChat]);

  // 챗봇 창 위에서 스크롤 시 배경 스크롤 막기
  const [isHovered, setIsHovered] = useState(false);
  useBodyScrollLock(isHovered);

  return (
    <Sheet
      modal={false}
      onOpenChange={(open) => {
        setSheetOpen(open);
        if (open) {
          handleChatReset();
        }
      }}
    >
      <ChatSheetTrigger />
      {sheetOpen && (
        <div
          className="fixed inset-0 h-screen w-screen bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      )}
      <SheetContent
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
        side="left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-500 m-1000 mt-auto flex h-[600px] w-90 flex-col gap-0 border-[2.5px] border-transparent bg-[linear-gradient(#fafbff,#fafbff),linear-gradient(171.25deg,#34aafb_-2.76%,#4eb0f6_12.29%,#73c1fd_38.18%,#009afa_89.66%)] [background-clip:content-box,border-box] bg-origin-border shadow-none"
        style={{
          boxShadow: 'var(--shadow-ai-chat)',
        }}
      >
        <ChatSheetHeader />

        {/* 채팅 시작 페이지 또는 채팅 히스토리 */}
        <div className="min-h-0 flex-1 shrink-0">
          {!didStartChat ? (
            <ChatStart onQuestionSelect={handleQuestionSelect} />
          ) : (
            <ChatHistory
              chatHistoryList={chatHistoryList}
              lastAnswer={lastAnswer}
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

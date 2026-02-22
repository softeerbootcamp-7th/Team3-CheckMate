import { useRef } from 'react';

import { CHAT_ROLE } from '@/constants/ai-chat';
import { useSpacerHeight } from '@/hooks/ai-chat';
import type { ChatHistoryItem as ChatHistoryItemType } from '@/types/ai-chat';

import { BotBubble } from './BotBubble';
import { UserBubble } from './UserBubble';

interface ChatHistoryProps {
  chatHistoryList: ChatHistoryItemType[];
  lastAnswer: string | null;
  isLoading: boolean;
  isStreaming: boolean;
}

export const ChatHistory = ({
  chatHistoryList,
  lastAnswer,
  isLoading,
  isStreaming,
}: ChatHistoryProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const userBubbleRef = useRef<HTMLDivElement>(null);
  const botBubbleRef = useRef<HTMLDivElement>(null);

  const { spacerRef } = useSpacerHeight({
    enabled: isLoading || isStreaming,
    isLoading,
    wrapperRef,
    userBubbleRef,
    botBubbleRef,
    historyCount: chatHistoryList.length,
  });

  const { USER, ASSISTANT } = CHAT_ROLE;

  return (
    <section
      ref={wrapperRef}
      className="mx-500 flex h-full flex-col overflow-y-scroll pb-4.5"
    >
      <div className="flex flex-col gap-400">
        {chatHistoryList.map((chat, index) => {
          const isLatest = index === chatHistoryList.length - 1;

          switch (chat.role) {
            case USER:
              return (
                <UserBubble
                  key={`${chat.role}-${index}`}
                  message={chat.content}
                  userBubbleRef={isLatest ? userBubbleRef : undefined}
                />
              );
            case ASSISTANT:
              return (
                <BotBubble
                  key={`${chat.role}-${index}`}
                  message={chat.content}
                />
              );
            default:
              console.warn('알 수 없는 역할의 채팅 항목:', chat);
              return null;
          }
        })}
        {lastAnswer !== null && ( // 마지막 답변이 있을 때만 BotBubble 렌더링
          <BotBubble
            message={lastAnswer}
            isLoading={isLoading}
            botBubbleRef={botBubbleRef}
          />
        )}
      </div>
      {/* 스트리밍용 하단 spacer */}
      <div ref={spacerRef} className="w-full shrink-0" />
    </section>
  );
};

import { useRef } from 'react';

import { useSpacerHeight } from '@/hooks/ai-chat';
import type { ChatHistoryItem as ChatHistoryItemType } from '@/types/ai-chat';

import { ChatHistoryItem } from './ChatHistoryItem';

interface ChatHistoryProps {
  chatHistoryList: ChatHistoryItemType[];
  isLoading: boolean;
  isStreaming: boolean;
}

export const ChatHistory = ({
  chatHistoryList,
  isLoading,
  isStreaming,
}: ChatHistoryProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const userBubbleRef = useRef<HTMLDivElement>(null);
  const botBubbleRef = useRef<HTMLParagraphElement>(null);

  const { spacerRef } = useSpacerHeight({
    enabled: isLoading || isStreaming,
    isLoading,
    wrapperRef,
    userBubbleRef,
    botBubbleRef,
    historyCount: chatHistoryList.length,
  });

  return (
    <section
      ref={wrapperRef}
      className="mx-500 flex h-full flex-col overflow-y-scroll pb-4.5"
    >
      <div className="flex flex-col gap-400">
        {chatHistoryList.map((chat, index) => {
          const isLatest = index === chatHistoryList.length - 1;

          return (
            <ChatHistoryItem
              key={`${chat.question}-${index}`}
              question={chat.question}
              answer={chat.answer}
              isLatest={isLatest}
              isLoading={isLatest && isLoading}
              userBubbleRef={isLatest ? userBubbleRef : undefined}
              botBubbleRef={isLatest ? botBubbleRef : undefined}
            />
          );
        })}
      </div>
      {/* 스트리밍용 하단 spacer */}
      <div ref={spacerRef} className="w-full shrink-0" />
    </section>
  );
};

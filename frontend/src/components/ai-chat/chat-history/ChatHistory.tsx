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
}: ChatHistoryProps) => {
  const lastIndex = chatHistoryList.length - 1;

  return (
    <section
      className="mx-500 flex h-full flex-col gap-400 overflow-y-scroll pb-4.5"
      id="chat-history-wrapper"
    >
      <div className="flex flex-1" />
      {chatHistoryList.map((chat, index) => {
        const isLatest = index === lastIndex;

        return (
          <ChatHistoryItem
            key={`${chat.question}-${index}`}
            question={chat.question}
            answer={chat.answer}
            isLatest={isLatest}
            isLoading={isLatest && isLoading}
          />
        );
      })}
    </section>
  );
};

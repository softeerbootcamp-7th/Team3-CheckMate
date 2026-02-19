import { memo, type RefObject } from 'react';

import type { ChatMessage } from '@/types/ai-chat';

import { BotBubble } from './BotBubble';
import { UserBubble } from './UserBubble';

interface ChatHistoryItemProps {
  message: ChatMessage;
  userBubbleRef?: RefObject<HTMLDivElement | null>;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}
const ChatHistoryItemComponent = ({
  message,
  userBubbleRef,
  botBubbleRef,
}: ChatHistoryItemProps) => {
  if (message.role === 'user') {
    return (
      <UserBubble message={message.content} userBubbleRef={userBubbleRef} />
    );
  }

  return (
    <BotBubble
      message={message.content}
      isLoading={message.status === 'loading'}
      isError={message.status === 'error'}
      botBubbleRef={botBubbleRef}
    />
  );
};

export const ChatHistoryItem = memo(
  ChatHistoryItemComponent,
  (prev, next) =>
    prev.message.id === next.message.id &&
    prev.message.role === next.message.role &&
    prev.message.content === next.message.content &&
    prev.message.status === next.message.status,
);

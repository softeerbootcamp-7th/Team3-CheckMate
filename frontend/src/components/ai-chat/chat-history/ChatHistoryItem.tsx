import { memo, type RefObject } from 'react';

import { BotBubble } from './BotBubble';
import { UserBubble } from './UserBubble';

interface ChatHistoryItemProps {
  question: string;
  answer: string;
  isLatest?: boolean;
  isLoading: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
  userBubbleRef?: RefObject<HTMLDivElement | null>;
}
const ChatHistoryItemComponent = ({
  question,
  answer,
  isLatest = false,
  isLoading,
  botBubbleRef,
  userBubbleRef,
}: ChatHistoryItemProps) => {
  return (
    <>
      <UserBubble message={question} userBubbleRef={userBubbleRef} />
      <BotBubble
        message={answer}
        isLatest={isLatest}
        isLoading={isLoading}
        botBubbleRef={botBubbleRef}
      />
    </>
  );
};

export const ChatHistoryItem = memo(
  ChatHistoryItemComponent,
  (prev, next) =>
    prev.question === next.question &&
    prev.answer === next.answer &&
    prev.isLatest === next.isLatest &&
    prev.isLoading === next.isLoading,
);

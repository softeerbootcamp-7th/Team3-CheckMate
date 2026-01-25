import { useRef } from 'react';

import { BotBubble } from '../bot-bubble/BotBubble';
import { UserBubble } from '../user-bubble/UserBubble';

interface ChatHistoryItemProps {
  question: string;
  answer: string;
  isLatest?: boolean;
}
export const ChatHistoryItem = ({
  question,
  answer,
  isLatest = false,
}: ChatHistoryItemProps) => {
  const userBubbleRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <UserBubble message={question} ref={userBubbleRef} />
      <BotBubble
        message={answer}
        isLatest={isLatest}
        userBubbleRef={userBubbleRef}
      />
    </>
  );
};

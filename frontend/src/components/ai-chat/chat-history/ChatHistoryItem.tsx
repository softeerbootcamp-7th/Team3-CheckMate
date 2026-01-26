import { BotBubble } from './BotBubble';
import { UserBubble } from './UserBubble';

interface ChatHistoryItemProps {
  question: string;
  answer: string;
  isLatest?: boolean;
  isLoading: boolean;
  botBubbleRef: React.RefObject<HTMLParagraphElement | null>;
  userBubbleRef: React.RefObject<HTMLParagraphElement | null>;
}
export const ChatHistoryItem = ({
  question,
  answer,
  isLatest = false,
  isLoading,
  botBubbleRef,
  userBubbleRef,
}: ChatHistoryItemProps) => {
  return (
    <>
      <UserBubble message={question} ref={userBubbleRef} />
      <BotBubble
        message={answer}
        isLatest={isLatest}
        isLoading={isLoading}
        ref={botBubbleRef}
      />
    </>
  );
};

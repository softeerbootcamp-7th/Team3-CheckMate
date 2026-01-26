import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLatest?: boolean;
  isLoading: boolean;
  ref: React.RefObject<HTMLParagraphElement | null>;
}

export const BotBubble = ({
  message,
  isLatest = false,
  isLoading = false,
  ref,
}: BotBubbleProps) => {
  if (isLatest && isLoading) {
    return <BotLoading />;
  }
  return (
    <>
      <p
        ref={ref}
        className="body-small-medium text-grey-900 whitespace-pre-line"
      >
        {message}
      </p>
    </>
  );
};

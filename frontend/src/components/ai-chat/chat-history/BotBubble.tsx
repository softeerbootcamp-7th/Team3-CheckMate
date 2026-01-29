import type { RefObject } from 'react';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLatest?: boolean;
  isLoading: boolean;
  botBubbleRef?: RefObject<HTMLParagraphElement | null>;
}

export const BotBubble = ({
  message,
  isLatest = false,
  isLoading = false,
  botBubbleRef,
}: BotBubbleProps) => {
  if (isLatest && isLoading) {
    return <BotLoading />;
  }
  return (
    <p
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 whitespace-pre-line"
    >
      {message}
    </p>
  );
};

import type { RefObject } from 'react';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLatest?: boolean;
  isLoading: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLatest = false,
  isLoading = false,
  botBubbleRef,
}: BotBubbleProps) => {
  return (
    <div
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 min-h-6 whitespace-pre-line"
    >
      {isLatest && isLoading ? <BotLoading /> : message}
    </div>
  );
};

import type { RefObject } from 'react';

import { cn } from '@/utils/shared/lib/utils';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLoading: boolean;
  isError?: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLoading = false,
  isError = false,
  botBubbleRef,
}: BotBubbleProps) => {
  return (
    <div
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 min-h-6 whitespace-pre-line"
    >
      {isLoading ? (
        <BotLoading />
      ) : (
        <p className={cn(isError && 'text-red-500')}>{message}</p>
      )}
    </div>
  );
};

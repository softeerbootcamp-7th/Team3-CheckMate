import type { RefObject } from 'react';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLoading: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLoading = false,
  botBubbleRef,
}: BotBubbleProps) => {
  return (
    <div
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 min-h-6 whitespace-pre-line"
    >
      {isLoading ? <BotLoading /> : message}
      {!isLoading && message === '' && (
        <span className="text-grey-500">
          답변을 생성하는 중 오류가 발생했습니다.
        </span>
      )}
    </div>
  );
};

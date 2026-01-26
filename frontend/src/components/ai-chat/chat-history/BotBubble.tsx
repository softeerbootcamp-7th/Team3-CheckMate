import { useRef } from 'react';

import { useAutoScroll } from '@/hooks/ai-chat/useAutoScroll';
import { useSpacerHeight } from '@/hooks/ai-chat/useSpacerHeight';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLatest?: boolean;
  isLoading: boolean;
  userBubbleRef?: React.RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLatest = false,
  isLoading = false,
  userBubbleRef,
}: BotBubbleProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  // 가장 최신 메시지로 자동 스크롤
  useAutoScroll({
    enabled: isLatest,
    dependencies: [isLoading],
  });

  // 아래 여백 높이 계산
  const spacerHeight = useSpacerHeight({
    enabled: isLatest,
    userBubbleRef: userBubbleRef ?? { current: null },
    textRef,
    displayedText: message,
  });

  if (isLatest && isLoading) {
    return <BotLoading />;
  }
  return (
    <>
      <p
        ref={textRef}
        className="body-small-medium text-grey-900 whitespace-pre-line"
      >
        {message}
      </p>
      {isLatest && (
        <div
          className="w-full shrink-0"
          style={{ height: `${spacerHeight}px` }}
        />
      )}
    </>
  );
};

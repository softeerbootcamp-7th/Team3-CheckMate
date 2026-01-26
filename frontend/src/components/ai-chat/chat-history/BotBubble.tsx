import { useEffect, useRef, useState } from 'react';

import { useAutoScroll } from '@/hooks/ai-chat/useAutoScroll';
import { useSpacerHeight } from '@/hooks/ai-chat/useSpacerHeight';
import { useStreamingText } from '@/hooks/ai-chat/useStreamingText';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLatest?: boolean;
  userBubbleRef?: React.RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLatest = false,
  userBubbleRef,
}: BotBubbleProps) => {
  const [isLoading, setIsLoading] = useState(isLatest);
  const textRef = useRef<HTMLParagraphElement>(null);

  // 로딩 상태 관리 (mocked)
  useEffect(() => {
    if (!isLatest) {
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isLatest]);

  // 스트리밍 텍스트 표시 (mocked)
  const displayedText = useStreamingText({
    text: message,
    enabled: !isLoading && isLatest,
  });

  // 가장 최신 메시지로 자동 스크롤
  useAutoScroll({
    enabled: isLatest,
    dependencies: [isLoading, displayedText],
  });

  // 아래 여백 높이 계산
  const spacerHeight = useSpacerHeight({
    enabled: isLatest,
    userBubbleRef: userBubbleRef ?? { current: null },
    textRef,
    displayedText,
  });

  if (isLoading) {
    return <BotLoading />;
  }
  return (
    <>
      <p
        ref={textRef}
        className="body-small-medium text-grey-900 whitespace-pre-line"
      >
        {displayedText}
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

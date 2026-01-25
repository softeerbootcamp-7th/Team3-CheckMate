import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { BotLoading } from '../bot-loading/BotLoading';

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
  const [isLoading, setIsLoading] = useState<boolean>(isLatest);
  const [displayed, setDisplayed] = useState<string>(isLatest ? '' : message);

  const [spacerHeight, setSpacerHeight] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!isLatest) {
      return;
    }
    // scroll to bottom
    const wrapper = document.getElementById('chat-history-wrapper');
    if (!wrapper) {
      return;
    }
    wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
  }, [isLoading, isLatest]);

  useEffect(() => {
    if (!isLatest) {
      return;
    }

    // 2초 뒤 로딩 종료 (mock)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isLatest]);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (!isLoading && isLatest) {
      // 스트리밍 mock
      let currentIndex = 0;
      id = setInterval(() => {
        setDisplayed(message.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex >= message.length) {
          clearInterval(id);
        }
      }, 30);
    }
    return () => clearInterval(id);
  }, [message, isLatest, isLoading]);

  useLayoutEffect(() => {
    if (
      !isLatest ||
      !userBubbleRef ||
      !userBubbleRef.current ||
      !textRef ||
      !textRef.current
    ) {
      return;
    }

    const wrapper = document.getElementById('chat-history-wrapper');
    if (!wrapper) {
      return;
    }

    // spacer 높이 계산: wrapper높이 - userBubble높이 - text높이
    const calculateHeight = () => {
      const wrapperH = wrapper.clientHeight;
      const userH = userBubbleRef.current?.clientHeight ?? 0;
      const textH = textRef.current?.clientHeight ?? 0;
      const PADDING_BOTTOM_HEIGHT = 18; // wrapper의 padding-bottom 값
      const GAP_HEIGHT = 16; // userBubble과 botBubble, botBubble과 spacer 사이 간격
      const newHeight = Math.max(
        0,
        wrapperH - userH - textH - PADDING_BOTTOM_HEIGHT - GAP_HEIGHT * 2,
      );
      setSpacerHeight(newHeight);
    };

    // 다음 프레임에 측정
    requestAnimationFrame(calculateHeight);

    // scroll to bottom, don't show scrollbar
    wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
  }, [isLatest, displayed, userBubbleRef]);

  if (isLoading) {
    return <BotLoading />;
  }
  return (
    <>
      <p
        ref={textRef}
        className="body-small-medium text-grey-900 whitespace-pre-line"
      >
        {displayed}
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

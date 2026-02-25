import { type RefObject, useCallback, useLayoutEffect, useRef } from 'react';

interface UseSpacerHeightOptions {
  enabled: boolean;
  isLoading: boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
  userBubbleRef: RefObject<HTMLDivElement | null>;
  botBubbleRef: RefObject<HTMLDivElement | null>;
  historyCount: number;
}

const PADDING_BOTTOM_HEIGHT = 18;
const GAP_HEIGHT = 16;

export const useSpacerHeight = ({
  enabled,
  isLoading,
  wrapperRef,
  userBubbleRef,
  botBubbleRef,
  historyCount,
}: UseSpacerHeightOptions) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const prevHistoryCountRef = useRef(0);

  // 여백 높이를 spacerRef에 직접 적용하고, 새 질문일 때 동기적으로 스크롤
  const updateSpacerHeight = useCallback(
    (botBubbleHeight: number) => {
      const wrapper = wrapperRef.current;
      const userBubble = userBubbleRef.current;
      const spacer = spacerRef.current;
      if (!wrapper || !userBubble || !spacer) {
        return;
      }

      const wrapperHeight = wrapper.clientHeight;
      const userHeight = userBubble.clientHeight;
      const newHeight = Math.max(
        0,
        wrapperHeight -
          userHeight -
          botBubbleHeight -
          PADDING_BOTTOM_HEIGHT -
          GAP_HEIGHT,
      );
      // 직접 여백 높이 업데이트
      spacer.style.height = `${newHeight}px`;

      // 질문이 새로 생성된 시점이라면 자동 스크롤
      const isQuestionNew =
        isLoading && historyCount > prevHistoryCountRef.current;
      if (isQuestionNew) {
        prevHistoryCountRef.current = historyCount;
        wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
      }
    },
    [wrapperRef, userBubbleRef, isLoading, historyCount],
  );

  useLayoutEffect(() => {
    if (!enabled) {
      // 스트리밍이 끝날 시 마지막으로 여백 높이 업데이트
      if (botBubbleRef.current) {
        updateSpacerHeight(botBubbleRef.current.clientHeight);
      }
      return;
    }

    // 챗봇 응답 리사이즈 이벤트 감지
    const botBubbleResizeObserver = new ResizeObserver((entries) => {
      const botBubble = entries[0];
      if (botBubble) {
        updateSpacerHeight(botBubble.contentRect.height);
      }
    });
    if (botBubbleRef.current) {
      botBubbleResizeObserver.observe(botBubbleRef.current);
    }

    return () => {
      botBubbleResizeObserver.disconnect();
    };
  }, [enabled, botBubbleRef, updateSpacerHeight]);

  return { spacerRef };
};

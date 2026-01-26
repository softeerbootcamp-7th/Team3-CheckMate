import { useLayoutEffect, useState } from 'react';

interface UseSpacerHeightOptions {
  enabled: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  userBubbleRef: React.RefObject<HTMLDivElement | null>;
  botBubbleRef: React.RefObject<HTMLParagraphElement | null>;
  displayedText: string;
  containerId?: string;
}

const PADDING_BOTTOM_HEIGHT = 18;
const GAP_HEIGHT = 16;

export const useSpacerHeight = ({
  enabled,
  wrapperRef,
  userBubbleRef,
  botBubbleRef,
  displayedText,
  containerId = 'chat-history-wrapper',
}: UseSpacerHeightOptions) => {
  const [spacerHeight, setSpacerHeight] = useState(0);

  useLayoutEffect(() => {
    if (!enabled || !userBubbleRef.current || !botBubbleRef.current) {
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const calculateHeight = () => {
      const wrapperH = wrapper.clientHeight;
      const userH = userBubbleRef.current?.clientHeight ?? 0;
      const textH = botBubbleRef.current?.clientHeight ?? 0;

      const newHeight = Math.max(
        0,
        wrapperH - userH - textH - PADDING_BOTTOM_HEIGHT - GAP_HEIGHT * 2,
      );
      setSpacerHeight(newHeight);
    };

    requestAnimationFrame(calculateHeight);

    wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
  }, [enabled, displayedText, userBubbleRef, botBubbleRef, containerId]);

  return spacerHeight;
};

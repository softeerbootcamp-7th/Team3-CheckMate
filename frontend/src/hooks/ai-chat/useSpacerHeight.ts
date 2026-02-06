import { type RefObject, useLayoutEffect, useState } from 'react';

interface UseSpacerHeightOptions {
  enabled: boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
  userBubbleRef: RefObject<HTMLDivElement | null>;
  botBubbleRef: RefObject<HTMLParagraphElement | null>;
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
}: UseSpacerHeightOptions) => {
  const [spacerHeight, setSpacerHeight] = useState(0);

  useLayoutEffect(() => {
    if (
      !enabled ||
      !userBubbleRef.current ||
      !botBubbleRef.current ||
      !wrapperRef.current
    ) {
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const calculateHeight = () => {
      const wrapperHeight = wrapper.clientHeight;
      const userHeight = userBubbleRef.current?.clientHeight ?? 0;
      const textHeight = botBubbleRef.current?.clientHeight ?? 0;

      const newHeight = Math.max(
        0,
        wrapperHeight -
          userHeight -
          textHeight -
          PADDING_BOTTOM_HEIGHT -
          GAP_HEIGHT * 2,
      );
      setSpacerHeight(newHeight);
    };

    requestAnimationFrame(calculateHeight);

    if (displayedText.length === 1) {
      wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: 'smooth' });
    }
  }, [enabled, wrapperRef, displayedText, userBubbleRef, botBubbleRef]);

  return spacerHeight;
};

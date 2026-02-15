import {
  BRIEFING_MESSAGE_HIGHLIGHT_COLOR,
  type BriefingMessageHighlightColor,
} from '@/constants/sales';

export const createMessageToken = (
  text: string,
  isHighlight?: boolean,
  highlight?: BriefingMessageHighlightColor,
) => {
  return {
    text,
    isHighlight,
    highlightColor: highlight
      ? BRIEFING_MESSAGE_HIGHLIGHT_COLOR[highlight]
      : BRIEFING_MESSAGE_HIGHLIGHT_COLOR.primary,
  };
};

export type MessageToken = ReturnType<typeof createMessageToken>;

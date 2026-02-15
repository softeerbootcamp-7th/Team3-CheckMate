export const BRIEFING_MESSAGE_HIGHLIGHT_COLOR = {
  primary: 'text-brand-main font-bold',
  negative: 'text-others-negative font-bold',
  default: 'text-grey-500 font-bold',
} as const;

export type BriefingMessageHighlightColor =
  keyof typeof BRIEFING_MESSAGE_HIGHLIGHT_COLOR;

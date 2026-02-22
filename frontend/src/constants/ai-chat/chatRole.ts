import type { ValueOf } from '@/utils/shared';

export const CHAT_ROLE = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

export type ChatRoleType = ValueOf<typeof CHAT_ROLE>;

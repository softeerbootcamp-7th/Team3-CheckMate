import type { ChatRoleType } from '@/constants/ai-chat';

export interface ChatHistoryItem {
  role: ChatRoleType;
  content: string;
}

import type { ChatHistoryItem } from '../chatHistory';

export interface PostAiChatStreamRequestDto {
  history: ChatHistoryItem[];
  question: string;
}

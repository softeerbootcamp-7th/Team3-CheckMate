import type { ChatHistoryItem } from '../chatHistory';

export interface PostAiChatStreamRequestDto {
  history: ChatHistoryItem[]; // 오류 발생 시 content에 '오류'
  question: string;
}

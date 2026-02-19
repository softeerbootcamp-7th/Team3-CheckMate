import type { ChatRole } from '../chatHistory';

export interface PostChatsRequestDto {
  history: {
    role: ChatRole;
    content: string;
  }[];
  question: string;
}

export interface PostChatsResponseDto {
  answer: string;
}

import { authorizedApi } from '@/services/shared';
import type {
  PostChatsRequestDto,
  PostChatsResponseDto,
} from '@/types/ai-chat';

interface PostChatOptions {
  signal?: AbortSignal;
}

export const postChat = async (
  dto: PostChatsRequestDto,
  options: PostChatOptions = {},
) => {
  const { data } = await authorizedApi.post<PostChatsResponseDto>(
    '/api/chats',
    {
      body: JSON.stringify(dto),
      signal: options.signal,
    },
  );

  return data;
};

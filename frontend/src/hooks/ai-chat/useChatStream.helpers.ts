import type { ChatMessage, PostChatsRequestDto } from '../../types/ai-chat';

export const STREAM_INTERVAL_MS = 30;
export const STREAM_CHUNK_SIZE = 2;
export const CANCEL_MESSAGE = '요청이 취소되었습니다.';

interface ApiErrorLike {
  status: number;
  errorCode: string;
  message: string;
}

const isApiErrorLike = (error: unknown): error is ApiErrorLike => {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const candidate = error as Partial<ApiErrorLike>;
  return (
    typeof candidate.status === 'number' &&
    typeof candidate.errorCode === 'string' &&
    typeof candidate.message === 'string'
  );
};

export const buildChatHistory = (
  messages: ChatMessage[],
): PostChatsRequestDto['history'] => {
  return messages
    .filter(
      (message) =>
        message.status === 'done' &&
        (message.role === 'user' || message.role === 'assistant'),
    )
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));
};

export const getUserFacingErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.name === 'AbortError') {
    return CANCEL_MESSAGE;
  }

  if (isApiErrorLike(error)) {
    if (error.status === 401) {
      return '로그인이 만료되었습니다. 다시 로그인해 주세요.';
    }
    if (error.errorCode === 'TIMEOUT_ERROR') {
      return '응답이 지연되고 있어요. 다시 시도해 주세요.';
    }
    if (error.status === 500) {
      return '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';
    }
    return error.message;
  }

  return '네트워크 연결을 확인해 주세요.';
};

interface GetNextStreamProgressParams {
  answer: string;
  cursor: number;
  chunkSize?: number;
}

interface StreamProgress {
  nextCursor: number;
  partialAnswer: string;
  isDone: boolean;
}

export const getNextStreamProgress = ({
  answer,
  cursor,
  chunkSize = STREAM_CHUNK_SIZE,
}: GetNextStreamProgressParams): StreamProgress => {
  const safeChunkSize = chunkSize > 0 ? chunkSize : STREAM_CHUNK_SIZE;
  const nextCursor = Math.min(answer.length, cursor + safeChunkSize);
  const partialAnswer = answer.slice(0, nextCursor);

  return {
    nextCursor,
    partialAnswer,
    isDone: nextCursor >= answer.length,
  };
};

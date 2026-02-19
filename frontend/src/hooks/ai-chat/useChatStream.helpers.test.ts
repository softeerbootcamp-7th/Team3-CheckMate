import { describe, expect, it } from 'vitest';

import type { ChatMessage } from '../../types/ai-chat';

import {
  buildChatHistory,
  CANCEL_MESSAGE,
  getNextStreamProgress,
  getUserFacingErrorMessage,
} from './useChatStream.helpers';

const createMessage = (
  role: ChatMessage['role'],
  content: string,
  status: ChatMessage['status'],
): ChatMessage => ({
  id: `${role}-${content}`,
  role,
  content,
  createdAt: '2026-02-19T00:00:00.000Z',
  status,
});

describe('buildChatHistory', () => {
  it('done 상태의 user/assistant 메시지만 history에 포함한다', () => {
    const messages: ChatMessage[] = [
      createMessage('user', '질문1', 'done'),
      createMessage('assistant', '답변1', 'done'),
      createMessage('assistant', '오류', 'error'),
      createMessage('assistant', '스트리밍중', 'streaming'),
      createMessage('user', '로딩중 질문', 'loading'),
    ];

    expect(buildChatHistory(messages)).toEqual([
      { role: 'user', content: '질문1' },
      { role: 'assistant', content: '답변1' },
    ]);
  });
});

describe('getNextStreamProgress', () => {
  it('chunk 단위로 다음 partial answer를 계산한다', () => {
    const answer = 'abcdef';

    expect(getNextStreamProgress({ answer, cursor: 0, chunkSize: 2 })).toEqual({
      nextCursor: 2,
      partialAnswer: 'ab',
      isDone: false,
    });
    expect(getNextStreamProgress({ answer, cursor: 4, chunkSize: 2 })).toEqual({
      nextCursor: 6,
      partialAnswer: 'abcdef',
      isDone: true,
    });
  });

  it('chunkSize가 0 이하이면 기본 chunk size를 사용한다', () => {
    const progress = getNextStreamProgress({
      answer: 'hello',
      cursor: 0,
      chunkSize: 0,
    });

    expect(progress.nextCursor).toBe(2);
    expect(progress.partialAnswer).toBe('he');
  });
});

describe('getUserFacingErrorMessage', () => {
  it('AbortError는 취소 메시지를 반환한다', () => {
    const abortError = new Error('aborted');
    abortError.name = 'AbortError';

    expect(getUserFacingErrorMessage(abortError)).toBe(CANCEL_MESSAGE);
  });

  it('401 에러는 로그인 만료 메시지를 반환한다', () => {
    expect(
      getUserFacingErrorMessage({
        status: 401,
        errorCode: 'UNAUTHORIZED',
        message: 'Unauthorized',
      }),
    ).toBe('로그인이 만료되었습니다. 다시 로그인해 주세요.');
  });

  it('TIMEOUT_ERROR는 타임아웃 메시지를 반환한다', () => {
    expect(
      getUserFacingErrorMessage({
        status: 504,
        errorCode: 'TIMEOUT_ERROR',
        message: 'Request timeout',
      }),
    ).toBe('응답이 지연되고 있어요. 다시 시도해 주세요.');
  });

  it('500 에러는 서버 오류 메시지를 반환한다', () => {
    expect(
      getUserFacingErrorMessage({
        status: 500,
        errorCode: 'EXTERNAL_API_ERROR',
        message: 'External API failed',
      }),
    ).toBe('일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
  });

  it('기타 ApiError는 서버 메시지를 그대로 반환한다', () => {
    expect(
      getUserFacingErrorMessage({
        status: 400,
        errorCode: 'BAD_REQUEST',
        message: '잘못된 요청입니다.',
      }),
    ).toBe('잘못된 요청입니다.');
  });

  it('ApiError 형태가 아니면 네트워크 오류 메시지를 반환한다', () => {
    expect(getUserFacingErrorMessage(new Error('Failed to fetch'))).toBe(
      '네트워크 연결을 확인해 주세요.',
    );
  });
});

import { useCallback, useReducer, useRef } from 'react';

import { CHAT_ROLE } from '@/constants/ai-chat';
import { sseClient } from '@/services/shared';
import {
  type ChatHistoryItem,
  type PostAiChatStreamRequestDto,
} from '@/types/ai-chat';

interface ChatState {
  chatHistoryList: ChatHistoryItem[];
  lastAnswer: string[] | null;
  isLoading: boolean;
  isStreaming: boolean;
}
type ChatAction =
  | { type: 'QUESTION'; payload: string }
  | { type: 'ADD_ANSWER'; payload: string }
  | { type: 'STREAM'; payload: string }
  | { type: 'FINISH' }
  | { type: 'RESET' };
const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case 'QUESTION':
      // 질문이 제출되면 로딩 상태로 전환하고, 질문을 히스토리에 추가
      return {
        ...state,
        isLoading: true,
        chatHistoryList: [
          ...state.chatHistoryList,
          { role: CHAT_ROLE.USER, content: action.payload || '' },
        ],
        lastAnswer: [],
      };
    case 'ADD_ANSWER':
      return {
        ...state,
        lastAnswer: null,
        chatHistoryList: [
          ...state.chatHistoryList,
          { role: CHAT_ROLE.ASSISTANT, content: action.payload || '' },
        ],
      };
    case 'STREAM':
      // 스트리밍된 답변을 lastAnswer에 누적
      return {
        ...state,
        isLoading: false,
        isStreaming: true,
        lastAnswer: [...(state.lastAnswer || []), action.payload || ''],
      };
    case 'FINISH':
      // 스트리밍이 종료되면 마지막 답변을 히스토리에 추가하고, 로딩 및 스트리밍 상태 해제
      return {
        ...state,
        isLoading: false,
        isStreaming: false,
      };
    case 'RESET':
      // 챗 상태 초기화
      return {
        isLoading: false,
        isStreaming: false,
        chatHistoryList: [],
        lastAnswer: null,
      };
  }
};

export const useChatStream = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    chatHistoryList: [],
    lastAnswer: null,
    isLoading: false,
    isStreaming: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const submitQuestion = useCallback(
    (question: string) => {
      abortControllerRef.current = new AbortController();

      try {
        if (state.lastAnswer !== null) {
          dispatch({ type: 'ADD_ANSWER', payload: state.lastAnswer.join('') });
        }

        const requestBody: PostAiChatStreamRequestDto = {
          history: state.chatHistoryList.map(({ role, content }) => ({
            role,
            content: content || '오류',
          })),
          question,
        };
        const body = JSON.stringify(requestBody);

        dispatch({ type: 'QUESTION', payload: question });

        sseClient('/api/chats/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          signal: abortControllerRef.current.signal,
          onmessage: (message) =>
            dispatch({ type: 'STREAM', payload: message.data }),
          onclose: () => dispatch({ type: 'FINISH' }),
          onerror: () => dispatch({ type: 'FINISH' }),
          openWhenHidden: true,
        }).catch((error) => {
          console.error('Failed to connect to chat stream', error);
          dispatch({ type: 'FINISH' });
        });
      } catch (error) {
        console.error('Failed to stringify chat history', error);
        dispatch({ type: 'FINISH' });
        return;
      }
    },
    [state.chatHistoryList, state.lastAnswer],
  );

  const cancelChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    dispatch({ type: 'FINISH' });
  }, []);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    dispatch({ type: 'RESET' });
  }, []);

  return {
    chatHistoryList: state.chatHistoryList,
    lastAnswer: state.lastAnswer,
    isLoading: state.isLoading,
    isStreaming: state.isStreaming,
    submitQuestion,
    cancelChat,
    resetChat,
  };
};

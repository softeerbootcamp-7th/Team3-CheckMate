import { useCallback, useReducer, useRef } from 'react';

import { CHAT_ROLE } from '@/constants/ai-chat';
import { sseClient } from '@/services/shared';
import { type ChatHistoryItem } from '@/types/ai-chat';
import type { EventSourceMessage } from '@/types/shared';

interface UseChatStreamReturn {
  chatHistoryList: ChatHistoryItem[];
  lastAnswer: string | null;
  isLoading: boolean;
  isStreaming: boolean;
  submitQuestion: (question: string) => void;
  cancelChat: () => void;
  resetChat: () => void;
}

interface ChatState {
  chatHistoryList: ChatHistoryItem[];
  lastAnswer: string | null;
  isLoading: boolean;
  isStreaming: boolean;
}
interface ChatAction {
  type: 'QUESTION' | 'STREAM' | 'FINISH' | 'RESET';
  payload?: string;
}
const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case 'QUESTION':
      return {
        ...state,
        isLoading: true,
        chatHistoryList: [
          ...state.chatHistoryList,
          { role: CHAT_ROLE.USER, content: action.payload || '' },
        ],
        lastAnswer: '',
      };
    case 'STREAM':
      return {
        ...state,
        isLoading: false,
        isStreaming: true,
        lastAnswer: (state.lastAnswer ?? '') + (action.payload || ''),
      };
    case 'FINISH':
      return {
        ...state,
        isLoading: false,
        isStreaming: false,
        chatHistoryList: [
          ...state.chatHistoryList,
          { role: CHAT_ROLE.ASSISTANT, content: state.lastAnswer || '' },
        ],
        lastAnswer: null,
      };
    case 'RESET':
      return {
        isLoading: false,
        isStreaming: false,
        chatHistoryList: [],
        lastAnswer: null,
      };
  }
};
export const useChatStream = (): UseChatStreamReturn => {
  const [state, dispatch] = useReducer(chatReducer, {
    chatHistoryList: [],
    lastAnswer: null,
    isLoading: false,
    isStreaming: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSseMessage = useCallback((message: EventSourceMessage) => {
    dispatch({ type: 'STREAM', payload: message.data });
  }, []);

  const handleSseClose = useCallback(() => {
    dispatch({ type: 'FINISH' });
  }, []);

  const handleSseError = useCallback((error: unknown) => {
    console.error('SSE error:', error);
    dispatch({ type: 'FINISH' });
  }, []);

  const submitQuestion = useCallback(
    (question: string) => {
      abortControllerRef.current = new AbortController();

      try {
        const requestBody = {
          history: state.chatHistoryList,
          question,
        };

        const body = JSON.stringify(requestBody);

        sseClient('/api/chats/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          signal: abortControllerRef.current.signal,
          onmessage: handleSseMessage,
          onclose: handleSseClose,
          onerror: handleSseError,
          openWhenHidden: true,
        });
      } catch (error) {
        console.error('Failed to stringify chat history', error);
        dispatch({ type: 'QUESTION', payload: question });
        dispatch({ type: 'FINISH' });
        return;
      }

      // 질문을 히스토리에 추가
      dispatch({ type: 'QUESTION', payload: question });
    },
    [state.chatHistoryList, handleSseMessage, handleSseClose, handleSseError],
  );

  const cancelChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      dispatch({ type: 'FINISH' });
    }
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

import { useCallback, useEffect, useReducer, useRef } from 'react';

import { CHAT_ROLE } from '@/constants/ai-chat';
import { sseClient } from '@/services/shared';
import {
  type ChatHistoryItem,
  type PostAiChatStreamRequestDto,
} from '@/types/ai-chat';

const { USER, ASSISTANT } = CHAT_ROLE;
const ERROR_CONTENT = '오류';

interface ChatState {
  chatHistoryList: ChatHistoryItem[];
  lastAnswer: string[] | null;
  isLoading: boolean;
  isStreaming: boolean;
  pendingRequestBody: PostAiChatStreamRequestDto | null;
}
type ChatAction =
  | { type: 'SUBMIT_QUESTION'; payload: string } // payload: question
  | { type: 'START_STREAM' }
  | { type: 'STREAM'; payload: string } // payload: streamed chunk
  | { type: 'FINISH' }
  | { type: 'RESET' };

const chatReducer = (state: ChatState, action: ChatAction) => {
  switch (action.type) {
    case 'SUBMIT_QUESTION':
      return {
        ...state,
        isLoading: true,
        chatHistoryList: [
          ...state.chatHistoryList,
          // 지난 응답을 히스토리에 추가
          ...(state.lastAnswer
            ? [{ role: ASSISTANT, content: state.lastAnswer.join('') }]
            : []),
          // 이번 질문을 히스토리에 추가
          { role: USER, content: action.payload || '' },
        ],
        lastAnswer: [],
      };
    case 'START_STREAM':
      return {
        ...state,
        // 스트리밍 요청 바디 생성
        pendingRequestBody: {
          history: state.chatHistoryList
            .slice(0, -1)
            .map(({ role, content }) => ({
              role,
              content: content || ERROR_CONTENT,
            })),
          question:
            state.chatHistoryList[state.chatHistoryList.length - 1].content,
        },
      };
    case 'STREAM':
      return {
        ...state,
        isLoading: false,
        isStreaming: true,
        // 스트리밍된 답변을 lastAnswer에 누적
        lastAnswer: [...(state.lastAnswer || []), action.payload || ''],
      };
    case 'FINISH':
      // 스트리밍이 종료되면, 로딩 및 스트리밍 상태 해제
      return {
        ...state,
        isLoading: false,
        isStreaming: false,
        pendingRequestBody: null,
      };
    case 'RESET':
      // 챗 상태 초기화
      return {
        isLoading: false,
        isStreaming: false,
        chatHistoryList: [],
        lastAnswer: null,
        pendingRequestBody: null,
      };
    default:
      return state;
  }
};

export const useChatStream = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    chatHistoryList: [],
    lastAnswer: null,
    isLoading: false,
    isStreaming: false,
    pendingRequestBody: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const submitQuestion = useCallback((question: string) => {
    abortControllerRef.current = new AbortController();

    dispatch({ type: 'SUBMIT_QUESTION', payload: question }); // 챗 히스토리 업데이트
    dispatch({ type: 'START_STREAM' }); // 요청 바디 생성 -> useEffect에서 SSE 연결 트리거
  }, []);

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

  // pendingRequestBody 가 설정되면 실제 SSE 연결을 수행한다 (사이드이펙트 분리)
  useEffect(() => {
    const bodyObject = state.pendingRequestBody;
    if (!bodyObject) {
      return;
    }
    try {
      const body = JSON.stringify(bodyObject);

      sseClient('/api/chats/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: abortControllerRef.current?.signal,
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

    return () => {
      // 언마운트 시 연결 중단
      abortControllerRef.current?.abort();
    };
  }, [state.pendingRequestBody]);

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

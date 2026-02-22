import { useCallback, useRef, useState } from 'react';

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

export const useChatStream = (): UseChatStreamReturn => {
  const [chatHistoryList, setChatHistoryList] = useState<ChatHistoryItem[]>([]);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null); // 마지막 답변을 상태로 관리

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSseMessage = useCallback((message: EventSourceMessage) => {
    try {
      const response = JSON.parse(message.data);

      setIsLoading(false);
      setIsStreaming(true);
      setLastAnswer((prev) => prev + response);
    } catch (error) {
      console.error('Failed to parse SSE message', error);
    }
  }, []);

  const handleSseClose = useCallback(() => {
    setIsLoading(false);
    setIsStreaming(false);
    setChatHistoryList((prev) => [
      ...prev,
      {
        role: CHAT_ROLE.ASSISTANT,
        content: lastAnswer || '',
      },
    ]);
    setLastAnswer(null); // 마지막 답변 초기화
  }, [lastAnswer]);

  const handleSseError = useCallback(
    (error: unknown) => {
      console.error('SSE error:', error);
      setIsLoading(false);
      setIsStreaming(false);
      setChatHistoryList((prev) => [
        ...prev,
        {
          role: CHAT_ROLE.ASSISTANT,
          content: lastAnswer + ' (답변을 생성하는 중 오류가 발생했습니다.)',
        },
      ]);
      setLastAnswer(null);
    },
    [lastAnswer],
  );

  const submitQuestion = useCallback(
    (question: string) => {
      abortControllerRef.current = new AbortController();

      // 로딩 상태 시작
      setIsLoading(true);

      try {
        const requestBody = {
          history: chatHistoryList,
          question,
        };

        const body = JSON.stringify(requestBody);

        sseClient('/api/chats/stream', {
          method: 'POST',
          body,
          signal: abortControllerRef.current.signal,
          onmessage: handleSseMessage,
          onclose: handleSseClose,
          onerror: handleSseError,
          openWhenHidden: true,
        });
      } catch (error) {
        console.error('Failed to stringify chat history', error);
        setIsLoading(false);
        // 실패 시 오류 메시지를 히스토리에 추가
        setChatHistoryList((prev) => [
          ...prev,
          { role: CHAT_ROLE.USER, content: question },
          {
            role: CHAT_ROLE.ASSISTANT,
            content: '답변을 생성하는 중 오류가 발생했습니다.',
          },
        ]);
        return;
      }

      // 질문을 히스토리에 추가
      setChatHistoryList((prev) => [
        ...prev,
        { role: CHAT_ROLE.USER, content: question },
      ]);
      setLastAnswer(''); // 마지막 답변 초기화
    },
    [chatHistoryList, handleSseMessage, handleSseClose, handleSseError],
  );

  const cancelChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setChatHistoryList((prev) => [
        ...prev,
        {
          role: CHAT_ROLE.ASSISTANT,
          content: lastAnswer || '',
        },
      ]);
      setLastAnswer(null);
    }
  }, [lastAnswer]);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChatHistoryList([]);
    setLastAnswer(null);
    setIsLoading(false);
    setIsStreaming(false);
  }, []);

  return {
    chatHistoryList,
    lastAnswer,
    isLoading,
    isStreaming,
    submitQuestion,
    cancelChat,
    resetChat,
  };
};

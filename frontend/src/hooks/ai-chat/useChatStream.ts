import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

import { postChat } from '@/services/ai-chat';
import type { ChatMessage } from '@/types/ai-chat';

import {
  buildChatHistory,
  CANCEL_MESSAGE,
  getNextStreamProgress,
  getUserFacingErrorMessage,
  STREAM_INTERVAL_MS,
} from './useChatStream.helpers';

interface UseChatStreamReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  submitQuestion: (question: string) => Promise<void>;
  cancelChat: () => void;
  resetChat: () => void;
}

const createMessage = (
  role: ChatMessage['role'],
  content: string,
  status: ChatMessage['status'] = 'done',
): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: new Date().toISOString(),
  status,
});

export const useChatStream = (): UseChatStreamReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const streamTimerRef = useRef<number | null>(null);
  const activeAssistantMessageIdRef = useRef<string | null>(null);
  const suppressAbortHandlingRef = useRef(false);

  const clearStreamTimer = useCallback(() => {
    if (streamTimerRef.current !== null) {
      window.clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearStreamTimer();
      abortControllerRef.current?.abort();
    };
  }, [clearStreamTimer]);

  const submitQuestion = useCallback(
    async (question: string) => {
      const trimmedQuestion = question.trim();
      if (!trimmedQuestion || isLoading) {
        return;
      }

      abortControllerRef.current = new AbortController();

      const userMessage = createMessage('user', trimmedQuestion);
      const loadingMessage = createMessage('assistant', '', 'loading');
      const loadingMessageId = loadingMessage.id;
      activeAssistantMessageIdRef.current = loadingMessageId;

      const history = buildChatHistory(messages);

      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsLoading(true);

      try {
        const data = await postChat(
          {
            history,
            question: trimmedQuestion,
          },
          {
            signal: abortControllerRef.current.signal,
          },
        );

        const answer = data.answer ?? '';
        let cursor = 0;

        const streamOneTick = () => {
          const { nextCursor, partialAnswer, isDone } = getNextStreamProgress({
            answer,
            cursor,
          });
          cursor = nextCursor;

          setMessages((prev) =>
            prev.map((message) =>
              message.id === loadingMessageId
                ? {
                    ...message,
                    content: partialAnswer,
                    status: isDone ? 'done' : 'streaming',
                  }
                : message,
            ),
          );

          if (isDone) {
            clearStreamTimer();
            activeAssistantMessageIdRef.current = null;
            abortControllerRef.current = null;
            setIsLoading(false);
          }
        };

        setMessages((prev) =>
          prev.map((message) =>
            message.id === loadingMessageId
              ? {
                  ...message,
                  content: '',
                  status: 'streaming',
                }
              : message,
          ),
        );

        if (!answer) {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === loadingMessageId
                ? {
                    ...message,
                    content: '',
                    status: 'done',
                  }
                : message,
            ),
          );
          activeAssistantMessageIdRef.current = null;
          abortControllerRef.current = null;
          setIsLoading(false);
          return;
        }

        streamOneTick();
        if (cursor < answer.length) {
          streamTimerRef.current = window.setInterval(
            streamOneTick,
            STREAM_INTERVAL_MS,
          );
        }
      } catch (error) {
        clearStreamTimer();

        const isAbortError =
          error instanceof Error && error.name === 'AbortError';
        if (isAbortError && suppressAbortHandlingRef.current) {
          suppressAbortHandlingRef.current = false;
          activeAssistantMessageIdRef.current = null;
          abortControllerRef.current = null;
          setIsLoading(false);
          return;
        }

        const errorMessage = getUserFacingErrorMessage(error);

        setMessages((prev) =>
          prev.map((message) =>
            message.id === loadingMessageId
              ? {
                  ...message,
                  content: errorMessage,
                  status: isAbortError ? 'done' : 'error',
                }
              : message,
          ),
        );
        toast.error(errorMessage);

        activeAssistantMessageIdRef.current = null;
        abortControllerRef.current = null;
        setIsLoading(false);
      }
    },
    [clearStreamTimer, isLoading, messages],
  );

  const cancelChat = useCallback(() => {
    if (
      streamTimerRef.current !== null &&
      activeAssistantMessageIdRef.current
    ) {
      const activeMessageId = activeAssistantMessageIdRef.current;
      clearStreamTimer();
      setMessages((prev) =>
        prev.map((message) =>
          message.id === activeMessageId
            ? {
                ...message,
                content: CANCEL_MESSAGE,
                status: 'done',
              }
            : message,
        ),
      );
      activeAssistantMessageIdRef.current = null;
      abortControllerRef.current = null;
      setIsLoading(false);
      toast.error(CANCEL_MESSAGE);
      return;
    }

    abortControllerRef.current?.abort();
  }, [clearStreamTimer]);

  const resetChat = useCallback(() => {
    suppressAbortHandlingRef.current = abortControllerRef.current !== null;
    clearStreamTimer();
    abortControllerRef.current?.abort();
    activeAssistantMessageIdRef.current = null;
    abortControllerRef.current = null;
    setMessages([]);
    setIsLoading(false);
  }, [clearStreamTimer]);

  return {
    messages,
    isLoading,
    submitQuestion,
    cancelChat,
    resetChat,
  };
};

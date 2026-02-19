import { useEffect, useMemo, useRef } from 'react';

import { useSpacerHeight } from '@/hooks/ai-chat';
import type { ChatMessage } from '@/types/ai-chat';

import { ChatHistoryItem } from './ChatHistoryItem';

interface ChatHistoryProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const latestQuestionRef = useRef<HTMLDivElement>(null);
  const latestBotBubbleRef = useRef<HTMLDivElement>(null);
  const responseScrolledMessageIdRef = useRef<string | null>(null);

  const latestUserMessageId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === 'user') {
        return messages[i].id;
      }
    }
    return null;
  }, [messages]);

  const latestAssistantMessage = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i]?.role === 'assistant') {
        return messages[i];
      }
    }
    return null;
  }, [messages]);

  const { spacerRef } = useSpacerHeight({
    enabled: isLoading,
    isLoading,
    wrapperRef,
    userBubbleRef: latestQuestionRef,
    botBubbleRef: latestBotBubbleRef,
    historyCount: messages.length,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    // 응답 도착 시 1회 스크롤 (스트리밍 중 반복 스크롤 방지)
    const isResponseArrived =
      latestAssistantMessage &&
      latestAssistantMessage.status !== 'loading' &&
      latestAssistantMessage.status !== 'streaming' &&
      latestAssistantMessage.content.length > 0 &&
      latestAssistantMessage.id !== responseScrolledMessageIdRef.current;

    if (isResponseArrived && latestAssistantMessage) {
      responseScrolledMessageIdRef.current = latestAssistantMessage.id;
      wrapper.scrollTo({
        top: wrapper.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [latestAssistantMessage, messages]);

  return (
    <section
      ref={wrapperRef}
      className="mx-500 flex h-full flex-col overflow-y-scroll pb-4.5"
    >
      <div className="flex flex-col gap-400">
        {messages.map((message) => (
          <ChatHistoryItem
            key={message.id}
            message={message}
            userBubbleRef={
              message.role === 'user' && message.id === latestUserMessageId
                ? latestQuestionRef
                : undefined
            }
            botBubbleRef={
              message.role === 'assistant' &&
              message.id === latestAssistantMessage?.id
                ? latestBotBubbleRef
                : undefined
            }
          />
        ))}
      </div>
      <div ref={spacerRef} className="w-full shrink-0" />
    </section>
  );
};

import { useCallback, useRef, useState } from 'react';

import type { ChatHistoryItem } from '@/types/ai-chat';

// mock 데이터
const mockedAnswer: ChatHistoryItem['answer'] = `오늘 제일 잘 팔린 메뉴는 👉 _아이스 아메리카노_입니다.

총 42잔 판매로 전체 판매 1위
점심 이후(12–15시)에 주문이 가장 몰렸어요
테이크아웃 비중이 높았습니다 ☕️

그다음으로 잘 팔린 메뉴
바닐라 라떼 – 27잔
크루아상 – 19개 (커피와 함께 세트 주문 많음)

💡 운영 인사이트

더운 날씨 영향으로 **아이스 음료 비중이 78%**로 높아요

아메리카노 + 베이커리 조합이 잘 나가서
→ 내일은 세트 노출을 조금 더 강조해도 좋아 보여요

앞으로도 궁금한 점 있으면 언제든 물어봐 주세요! 😊`;

interface UseChatStreamReturn {
  chatHistoryList: ChatHistoryItem[];
  isLoading: boolean;
  isStreaming: boolean;
  submitQuestion: (question: string) => void;
  cancelChat: () => void;
  resetChat: () => void;
}

export const useChatStream = (): UseChatStreamReturn => {
  const [chatHistoryList, setChatHistoryList] = useState<ChatHistoryItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const submitQuestion = useCallback((question: string) => {
    abortControllerRef.current = new AbortController();

    // 질문을 히스토리에 추가
    setChatHistoryList((prev) => [...prev, { question, answer: '' }]);

    // 로딩 상태 시작
    setIsLoading(true);

    // 2초 뒤 스트리밍 시작 (mock)
    const MOCK_LOADING_DELAY = 2000;
    const MOCK_STREAMING_SPEED = 30; // ms per character
    setTimeout(() => {
      // 로딩 완료, 스트리밍 시작
      setIsLoading(false);
      setIsStreaming(true);

      const lastAnswer = mockedAnswer;
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        // 요청 취소 또는 스트리밍 완료
        if (
          abortControllerRef.current?.signal.aborted ||
          currentIndex >= lastAnswer.length
        ) {
          clearInterval(intervalId);

          // 스트리밍 상태 초기화
          setIsLoading(false);
          setIsStreaming(false);

          return;
        }

        // 히스토리의 마지막 항목 answer를 직접 업데이트 (함수형 업데이트)
        const newText = lastAnswer.slice(0, currentIndex + 1);
        setChatHistoryList((prev) => [
          ...prev.slice(0, -1),
          {
            question: prev[prev.length - 1].question,
            answer: newText,
          },
        ]);
        currentIndex++;
      }, MOCK_STREAMING_SPEED);
    }, MOCK_LOADING_DELAY);
  }, []);

  const cancelChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChatHistoryList([]);
    setIsLoading(false);
    setIsStreaming(false);
  }, []);

  return {
    chatHistoryList,
    isLoading,
    isStreaming,
    submitQuestion,
    cancelChat,
    resetChat,
  };
};

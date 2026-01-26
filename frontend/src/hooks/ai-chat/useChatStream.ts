import { useCallback, useRef, useState } from 'react';

import type { ChatHistoryItem } from '@/types/ai-chat';

// mock 데이터
const MOCK_CHAT_LIST: ChatHistoryItem[] = [
  {
    question: '지금 상태를 한 줄로 요약해줘',
    answer:
      '현재 시스템은 정상적으로 작동 중이며, 모든 서비스가 원활하게 제공되고 있습니다.',
  },
  {
    question: '이 화면에서 주의할 포인트가 있을까?',
    answer:
      '이 화면에서는 네트워크 연결 상태를 주의 깊게 모니터링해야 합니다. 불안정한 연결은 데이터 전송에 영향을 미칠 수 있습니다.',
  },
  {
    question: '지금 뭐부터 확인하면 좋을지 우선순위로 알려줘',
    answer:
      '첫 번째로 서버 상태를 확인하고, 두 번째로 데이터베이스 연결 상태를 점검한 후, 마지막으로 사용자 활동 로그를 검토하는 것이 좋습니다.',
  },
  {
    question: '오늘 뭐가 제일 잘 팔렸을까?',
    answer: `
오늘 제일 잘 팔린 메뉴는 👉 _아이스 아메리카노_입니다.

총 42잔 판매로 전체 판매 1위
점심 이후(12–15시)에 주문이 가장 몰렸어요
테이크아웃 비중이 높았습니다 ☕️

그다음으로 잘 팔린 메뉴
바닐라 라떼 – 27잔
크루아상 – 19개 (커피와 함께 세트 주문 많음)
`,
  },
];

interface UseChatStreamReturn {
  chatHistoryList: ChatHistoryItem[];
  isLoading: boolean;
  isStreaming: boolean;
  submitQuestion: (question: string) => void;
  cancelChat: () => void;
  resetChat: () => void;
}

export const useChatStream = (): UseChatStreamReturn => {
  const [chatHistoryList, setChatHistoryList] =
    useState<ChatHistoryItem[]>(MOCK_CHAT_LIST);

  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const submitQuestion = (question: string) => {
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

      const lastAnswer = MOCK_CHAT_LIST[MOCK_CHAT_LIST.length - 1].answer;
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
  };

  const cancelChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const resetChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChatHistoryList(MOCK_CHAT_LIST);
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

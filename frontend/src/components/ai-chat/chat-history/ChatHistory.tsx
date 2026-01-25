import { ChatHistoryItem } from '../chat-history-item/ChatHistoryItem';

export const ChatHistory = () => {
  const chatList = [
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
      question: `오늘 뭐가 제일 잘 팔렸을까?`,
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

  return (
    <section
      className="mx-500 flex h-full flex-col gap-400 overflow-y-scroll pb-4.5"
      id="chat-history-wrapper"
    >
      <div className="flex flex-1" /> {/* spacer */}
      {chatList.map((chat, index) => (
        <ChatHistoryItem
          key={chat.question + chat.answer}
          question={chat.question}
          answer={chat.answer}
          isLatest={index === chatList.length - 1}
        />
      ))}
    </section>
  );
};

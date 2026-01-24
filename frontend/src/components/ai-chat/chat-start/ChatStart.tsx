import { RecommendedQuestion } from '../recommended-question/RecommendedQuestion';

interface ChatStartProps {
  onQuestionSelect: (question: string) => void;
}

export const ChatStart = ({ onQuestionSelect }: ChatStartProps) => {
  const questions = [
    '지금 상태를 한 줄로 요약해줘',
    '이 화면에서 주의할 포인트가 있을까?',
    '지금 뭐부터 확인하면 좋을지 우선순위로 알려줘',
  ];

  return (
    <section className="mt-18 flex h-full flex-col justify-between gap-y-20 px-500">
      <div className="flex flex-col gap-y-250">
        <h1 className="title-small-bold text-grey-900 text-center whitespace-pre">
          {'오늘 매장 운영 흐름을\n함께 분석해볼까요?'}
        </h1>
        <p className="body-small-medium text-grey-500 text-center whitespace-pre">
          {
            '보고 있는 화면의 전략을 함께 해석해드려요.\n데이터가 부족할 경우, 정확도가 낮을 수 있어요.'
          }
        </p>
      </div>
      <ul className="flex flex-col gap-150">
        {questions.map((question) => (
          <RecommendedQuestion
            key={question}
            question={question}
            onSelect={onQuestionSelect}
          />
        ))}
      </ul>
    </section>
  );
};

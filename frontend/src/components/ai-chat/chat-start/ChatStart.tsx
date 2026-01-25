import { CHAT_RECOMMENDED_QUESTIONS } from '@/constants/ai-chat';

import { RecommendedQuestion } from '../recommended-question/RecommendedQuestion';

interface ChatStartProps {
  onQuestionSelect: (question: string) => void;
}

export const ChatStart = ({ onQuestionSelect }: ChatStartProps) => {
  return (
    <section className="flex h-full flex-col justify-between px-500 pt-18 pb-4.5">
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
        {CHAT_RECOMMENDED_QUESTIONS.map((question) => (
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

import { useLocation } from 'react-router-dom';

import { getRecommendedQuestions } from '@/utils/ai-chat';

import { RecommendedQuestionItem } from './RecommendedQuestionItem';

interface RecommendedQuestionListProps {
  onQuestionSelect: (question: string) => void;
}

export const RecommendedQuestionList = ({
  onQuestionSelect,
}: RecommendedQuestionListProps) => {
  const location = useLocation();
  const questions = getRecommendedQuestions(location.pathname);

  return (
    <ul className="flex flex-col gap-150">
      {questions.map((question) => (
        <RecommendedQuestionItem
          key={question}
          question={question}
          onSelect={onQuestionSelect}
        />
      ))}
    </ul>
  );
};

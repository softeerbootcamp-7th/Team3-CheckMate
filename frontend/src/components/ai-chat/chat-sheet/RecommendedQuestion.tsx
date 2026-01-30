import { Button } from '@/components/shared/shadcn-ui';

interface RecommendedQuestionProps {
  question: string;
  onSelect: (question: string) => void;
}
export const RecommendedQuestion = ({
  question,
  onSelect,
}: RecommendedQuestionProps) => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="border-grey-300 caption-large-semibold text-grey-900 rounded-600 size-fit px-350 py-200 shadow-none"
      onClick={() => onSelect?.(question)}
    >
      {question}
    </Button>
  );
};

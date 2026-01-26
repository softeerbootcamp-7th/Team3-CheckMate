import { useCallback, useEffect, useRef } from 'react';

import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Textarea } from '@/components/shared/ui/textarea';

interface ChatQuestionInputProps {
  selectedQuestion: string | null;
  onSelectedQuestionProcessed: () => void;
  onQuestionSubmit: (question: string) => void;
}
export const ChatQuestionInput = ({
  selectedQuestion,
  onSelectedQuestionProcessed,
  onQuestionSubmit,
}: ChatQuestionInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitQuestion = useCallback(() => {
    if (!textareaRef.current) {
      return;
    }
    const question = textareaRef.current.value.trim() || '';
    textareaRef.current.value = '';

    if (!question) {
      return;
    }
    onQuestionSubmit(question);
  }, [onQuestionSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // 엔터 키 누르면 submit 발생, shift 엔터키 누르면 줄바꿈
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmitQuestion();
      }
    },
    [handleSubmitQuestion],
  );

  useEffect(() => {
    // selectedQuestion이 변경되면 자동으로 제출
    if (selectedQuestion && textareaRef.current) {
      textareaRef.current.value = selectedQuestion;
      handleSubmitQuestion();
      onSelectedQuestionProcessed();
    }
  }, [selectedQuestion, onSelectedQuestionProcessed, handleSubmitQuestion]);

  return (
    <div className="bg-grey-200 rounded-300 flex gap-300 px-400 py-300">
      <Textarea
        id="ai-chat"
        ref={textareaRef}
        placeholder="무엇이든 물어보세요."
        className="peer placeholder:text-grey-500 text-grey-900 body-small-medium max-h-35 resize-none overflow-y-scroll border-none p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 등록
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        onClick={handleSubmitQuestion}
        className="bg-grey-300 peer-[:not(:placeholder-shown)]:bg-grey-900 size-7.5 rounded-full border-none p-0"
      >
        <ArrowUp className="peer-[:not(:placeholder-shown)]:text-grey-0 text-grey-500 size-5" />
      </Button>
    </div>
  );
};

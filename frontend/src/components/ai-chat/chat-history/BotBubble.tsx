import type { RefObject } from 'react';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string;
  isLoading?: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLoading = false,
  botBubbleRef,
}: BotBubbleProps) => {
  const sentences = message.split('.');

  return (
    <div
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 min-h-6 leading-loose whitespace-pre-line"
    >
      {isLoading ? (
        <BotLoading />
      ) : (
        // 문장별로 애니메이션을 적용하여 순차적으로 나타나도록 함
        sentences.map((sentence, index) => (
          <span
            key={`${index}-${sentence}`}
            className="animate-fade-in-forwards whitespace-pre-wrap opacity-0"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {sentence}
            {/* 백엔드 응답에서 '.' 뒤에 공백 생략됨 */}
            {index !== sentences.length - 1 ? '. ' : ''}
          </span>
        ))
      )}
      {/* 빈 문자열로 로딩이 끝날 경우 오류 */}
      {!isLoading && message === '' && (
        <span className="text-grey-500">
          답변을 생성하는 중 오류가 발생했습니다.
        </span>
      )}
    </div>
  );
};

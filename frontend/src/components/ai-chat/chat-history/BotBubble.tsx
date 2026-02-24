import type { RefObject } from 'react';

import { BotLoading } from './BotLoading';

interface BotBubbleProps {
  message: string | string[]; // 스트리밍 중일 때 string 배열
  isLoading?: boolean;
  botBubbleRef?: RefObject<HTMLDivElement | null>;
}

export const BotBubble = ({
  message,
  isLoading = false,
  botBubbleRef,
}: BotBubbleProps) => {
  const chunks = Array.isArray(message) ? message : [message];

  return (
    <div
      ref={botBubbleRef}
      className="body-small-medium text-grey-900 min-h-6 leading-loose whitespace-pre-line"
    >
      {isLoading ? (
        <BotLoading />
      ) : (
        // 청크별로 애니메이션을 적용하여 순차적으로 나타나도록 함
        chunks.map((chunk, index) => (
          <span
            key={`${index}-${chunk}`}
            className="animate-fade-in-forwards whitespace-pre-wrap opacity-0"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* 백엔드 trim 오류로 인한 임시 코드 */}
            {chunk.replace(/([.?!])(?=\S)/g, '$1 ')}
          </span>
        ))
      )}
      {/* 빈 문자열로 로딩이 끝날 경우 오류 */}
      {!isLoading && (message === '' || chunks.length === 0) && (
        <span className="text-grey-500">
          답변을 생성하는 중 오류가 발생했습니다.
        </span>
      )}
    </div>
  );
};

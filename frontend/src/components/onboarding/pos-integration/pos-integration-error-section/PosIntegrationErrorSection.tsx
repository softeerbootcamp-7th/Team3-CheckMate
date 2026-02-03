import { CDN_BASE_URL } from '@/constants/shared';

import { PosIntegrationRetryButton } from './PosIntegrationRetryButton';

export const PosIntegrationErrorSection = () => {
  return (
    <section className="flex size-full flex-col items-center gap-[12.5rem] pt-79">
      <div className="flex flex-col items-center gap-8">
        <img
          src={`${CDN_BASE_URL}/assets/images/warning.svg`}
          alt="연동 실패"
          className="size-21"
        />
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="headline-small-semibold text-grey-900">
            POS 연동이 완료되지 않았어요
          </h1>
          <p className="title-small-medium text-grey-600 text-center whitespace-pre-wrap">
            {`일시적인 문제로 POS 연동이 정상적으로 진행되지 않았어요.\n연동을 다시 시도해주세요.`}
          </p>
        </div>
      </div>
      <PosIntegrationRetryButton />
    </section>
  );
};

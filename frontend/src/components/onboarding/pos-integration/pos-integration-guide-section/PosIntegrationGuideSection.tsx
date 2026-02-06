import { POS_INTEGRATION_GUIDE_CARD_LIST } from '@/constants/onboarding/pos-integration';

import { PosIntegrationGuideCard } from './PosIntegrationGuideCard';

export const PosIntegrationGuideSection = () => {
  return (
    <section className="flex flex-col px-55 pt-32">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <h1 className="headline-small-semibold text-grey-900">
          이제 POS 연동만 하면 끝나요!
        </h1>
        <p className="body-large-medium text-grey-600 whitespace-pre-wrap">{`POS 연동은 매장에서 사용하는 POS 기기에서 진행돼요.\nPOS 기기에서 연동을 시작하면 이 화면은 자동으로 다음 단계로 넘어가요.`}</p>
      </div>
      <div className="mb-5 flex w-full justify-center gap-4">
        {POS_INTEGRATION_GUIDE_CARD_LIST.map((card, index) => (
          <PosIntegrationGuideCard
            key={card.path}
            stepCount={index + 1}
            path={card.path}
            description={card.description}
          />
        ))}
      </div>
      <p className="text-grey-600 body-medium-medium text-center">
        조회 전용 연동으로, 기존 매출·메뉴 데이터에는 영향을 주지 않아요.
      </p>
    </section>
  );
};

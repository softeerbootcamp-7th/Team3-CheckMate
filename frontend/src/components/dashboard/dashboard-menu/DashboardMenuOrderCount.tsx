import { useNavigate } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';

export const DashboardMenuOrderCount = () => {
  const cardCode = 'MNU_03_01';
  const cardInfo = DASHBOARD_METRIC_CARDS[cardCode];

  const navigate = useNavigate();
  // 데이터 정보
  const displayedOrderTopMenu = {
    menuName: '아메리카노(ICE)',
    timeLine: '8-10',
  };
  return (
    <DefaultCardWrapper
      width={340 * cardInfo.sizeX}
      height={228 * cardInfo.sizeY}
      title={cardInfo.label}
      hasChevronRightIcon={true}
      onClickChevronRightIcon={() => {
        navigate('analysis/menu');
      }}
    >
      <p>
        <span className="title-large-bold text-brand-main">
          {displayedOrderTopMenu.menuName}는 {displayedOrderTopMenu.timeLine}시
        </span>
        <br />
        <span className="title-large-semibold text-grey-900">
          주문이 가장 많아요
        </span>
      </p>
    </DefaultCardWrapper>
  );
};

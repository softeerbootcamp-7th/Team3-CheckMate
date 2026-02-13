import { useNavigate } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { dashboardMenuSalesRankItems } from '@/mocks/data/dashboard';

import { DashboardMenuRankItem } from './DashboardMenuRankItem';

export const DashBoardMenuRankingCard = () => {
  const cardCode = 'MNU_01_01';
  const cardInfo = DASHBOARD_METRIC_CARDS[cardCode];

  const navigate = useNavigate();
  // 데이터 정보
  const displayedRankItems = dashboardMenuSalesRankItems;
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
      {displayedRankItems.map(({ rank, itemName, amount, unit }) => (
        <DashboardMenuRankItem
          key={rank}
          rank={rank}
          itemName={itemName}
          amount={amount}
          unit={unit}
        />
      ))}
    </DefaultCardWrapper>
  );
};

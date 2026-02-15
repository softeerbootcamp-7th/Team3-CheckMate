import { useNavigate } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { dashboardMenuSalesRankItems } from '@/mocks/data/dashboard';

import { DashboardMenuRankItem } from './DashboardMenuRankItem';

type MenuSalesRankingCardCode = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.POPULAR_MENU.items.MENU_SALES_RANKING
>;

// 메뉴분석 > 메뉴별 매출 랭킹
interface DashBoardMenuRankingCardProps {
  cardCode: MenuSalesRankingCardCode;
}
export const DashBoardMenuRankingCard = ({
  cardCode,
}: DashBoardMenuRankingCardProps) => {
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

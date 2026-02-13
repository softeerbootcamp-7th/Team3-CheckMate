import { useNavigate } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { dashboardMenuIngredientRankItems } from '@/mocks/data/dashboard';
import { cn } from '@/utils/shared';

import { DashboardMenuRankItem } from './DashboardMenuRankItem';

export const DashboardIngredientRankingCard = () => {
  const cardCode = 'MNU_04_01';
  const cardInfo = DASHBOARD_METRIC_CARDS[cardCode];

  const navigate = useNavigate();
  const displayedRankItems = dashboardMenuIngredientRankItems;
  // 식자제 등록되어 있는지 정보
  const hasRegisteredIngredients = false;

  return (
    <DefaultCardWrapper
      width={340 * cardInfo.sizeX}
      height={228 * cardInfo.sizeY}
      title={cardInfo.label}
      hasChevronRightIcon={true}
      onClickChevronRightIcon={() => {
        navigate('analysis/menu');
      }}
      className={cn(
        !hasRegisteredIngredients && 'border-others-negative border-2',
      )}
    >
      {hasRegisteredIngredients ? (
        displayedRankItems.map(({ rank, itemName, amount, unit }) => (
          <DashboardMenuRankItem
            key={rank}
            rank={rank}
            itemName={itemName}
            amount={amount}
            unit={unit}
          />
        ))
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2">
            <span className="body-large-bold">식재료 미등록</span>
            <span className="body-small-medium text-grey-700 text-center">
              자동으로 식재료 파악하고,
              <br /> 간편하게 매장을 운영하세요.
            </span>
          </div>
        </div>
      )}
    </DefaultCardWrapper>
  );
};

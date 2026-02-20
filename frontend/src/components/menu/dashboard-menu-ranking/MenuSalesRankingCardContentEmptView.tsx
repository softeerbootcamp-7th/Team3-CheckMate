import { ListOrdered } from 'lucide-react';

import {
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';
import { createMessageToken } from '@/utils/sales/dashboard';
import { cn } from '@/utils/shared';

type MenuSalesRankingCardContentEmptyViewCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.POPULAR_MENU.items.MENU_SALES_RANKING
>;

interface MenuSalesRankingCardContentEmptyViewProps {
  cardCode: MenuSalesRankingCardContentEmptyViewCodes;
}

const getEmptyViewMessage = (
  period: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>,
) => {
  const dateMessage = period;

  if (period === PERIOD_PRESETS.today7_30.today) {
    return {
      body: [
        createMessageToken(dateMessage),
        createMessageToken(' 판매된 메뉴', true, 'primary'),
        createMessageToken('가\n 아직 없어요.'),
      ],
      caption: [
        createMessageToken('첫 주문이 들어오면\n 인기 메뉴를 알려드릴게요!'),
      ],
    };
  }

  return {
    body: [
      createMessageToken(dateMessage),
      createMessageToken(' 주문 데이터', true, 'primary'),
      createMessageToken('가\n 아직 부족해요.'),
    ],
    caption: [
      createMessageToken('데이터가 쌓이면\n 주간 인기 메뉴를 분석해 드릴게요!'),
    ],
  };
};

export const MenuSalesRankingCardContentEmptyView = ({
  cardCode,
}: MenuSalesRankingCardContentEmptyViewProps) => {
  const { period } = DASHBOARD_METRIC_CARDS[cardCode];
  const { body, caption } = getEmptyViewMessage(period);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <ListOrdered className="text-brand-main size-full" />
      </div>
      <p className="body-large-bold text-grey-900 text-center whitespace-pre">
        {body.map(({ text, isHighlight, highlightColor }, index) => (
          <span
            key={index}
            className={cn(
              'text-grey-900 break-keep whitespace-pre-wrap',
              isHighlight && highlightColor,
            )}
          >
            {text}
          </span>
        ))}
      </p>
      <span className="body-small-medium text-grey-700 text-center whitespace-pre">
        {caption.map((token) => token.text).join('')}
      </span>
    </div>
  );
};

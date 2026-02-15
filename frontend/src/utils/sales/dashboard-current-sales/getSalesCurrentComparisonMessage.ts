import { METRIC_TREND, type MetricTrend } from '@/constants/dashboard';
import { DAY_OF_WEEK_LIST, PERIOD_PRESETS } from '@/constants/shared';
import { assertNever, formatNumber, type ValueOf } from '@/utils/shared';

import { createMessageToken, type MessageToken } from '../dashboard';

interface GetSalesCurrentComparisonMessageArgs {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
  hasPreviousData: boolean;
  metricTrend: MetricTrend;
  metricLabel: string;
  comparisonAmount: number;
  unit: string;
}

export const getSalesCurrentComparisonMessage = ({
  periodType,
  hasPreviousData,
  metricTrend,
  metricLabel,
  comparisonAmount,
  unit,
}: GetSalesCurrentComparisonMessageArgs): MessageToken[] => {
  const weekday = DAY_OF_WEEK_LIST[new Date().getDay()];

  const PERIOD_TEXT = {
    [PERIOD_PRESETS.dayWeekMonth.today]: `지난주 ${weekday}요일`,
    [PERIOD_PRESETS.dayWeekMonth.thisWeek]: `지난주 이맘때`,
    [PERIOD_PRESETS.dayWeekMonth.thisMonth]: `지난달 이맘때`,
  };

  if (!hasPreviousData) {
    return [
      createMessageToken(
        `${PERIOD_TEXT[periodType]}에는 ${metricLabel}이 거의 없었어요.`,
      ),
    ];
  }

  const METRIC_TREND_TEXT = {
    [METRIC_TREND.UP]: '늘었어요.',
    [METRIC_TREND.DOWN]: '줄었어요.',
    [METRIC_TREND.SAME]: '비슷해요.',
  };

  const formattedComparisonAmount = formatNumber(comparisonAmount);

  switch (periodType) {
    case PERIOD_PRESETS.dayWeekMonth.today:
      if (metricTrend === METRIC_TREND.SAME) {
        return [
          createMessageToken(`${PERIOD_TEXT[periodType]} 이 시간과 `),
          createMessageToken(
            `${METRIC_TREND_TEXT[metricTrend]}`,
            true,
            'default',
          ),
        ];
      }
      return [
        createMessageToken(`${PERIOD_TEXT[periodType]} 이 시간보다 `),
        createMessageToken(
          `${formattedComparisonAmount}${unit} ${METRIC_TREND_TEXT[metricTrend]}`,
          true,
          metricTrend === METRIC_TREND.UP ? 'primary' : 'negative',
        ),
      ];
    case PERIOD_PRESETS.dayWeekMonth.thisWeek:
    case PERIOD_PRESETS.dayWeekMonth.thisMonth:
      if (metricTrend === METRIC_TREND.SAME) {
        return [
          createMessageToken(`${PERIOD_TEXT[periodType]}와 `),
          createMessageToken(
            `${METRIC_TREND_TEXT[metricTrend]}`,
            true,
            'default',
          ),
        ];
      }
      return [
        createMessageToken(`${PERIOD_TEXT[periodType]}보다 `),
        createMessageToken(
          `${formattedComparisonAmount}${unit} ${METRIC_TREND_TEXT[metricTrend]}`,
          true,
          metricTrend === METRIC_TREND.UP ? 'primary' : 'negative',
        ),
      ];
    default:
      return assertNever(periodType);
  }
};

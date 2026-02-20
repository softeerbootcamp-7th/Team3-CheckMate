const createXData = (labels: string[]) =>
  labels.map((label) => ({ amount: label, unit: '' }));

const createYData = (values: number[]) =>
  values.map((value) => ({ amount: value, unit: '' }));

export const SALES_TREND = {
  DEFAULT_TREND_CHART_WIDTH: 1040,
  DEFAULT_TREND_CHART_WIDTH_FOR_RECENT_30_DAYS: 700,
  DEFAULT_TREND_CHART_HEIGHT: 120,
  EXAMPLE_DATA: {
    SLS_09_04: {
      data: {
        mainX: createXData([
          '1월 15일',
          '1월 16일',
          '1월 17일',
          '1월 18일',
          '1월 19일',
          '1월 20일',
          '오늘',
        ]),
        mainY: createYData([520, 180, 330, 470, 600, 460, 220]),
        subX: createXData([
          '1월 15일',
          '1월 16일',
          '1월 17일',
          '1월 18일',
          '1월 19일',
          '1월 20일',
          '오늘',
        ]),
        subY: createYData([16, 20, 14, 23, 20, 23, 14]),
      },
      color: 'var(--color-grey-400)',
    },
    SLS_10_07: {
      data: {
        mainX: createXData([
          '12월 1~7일',
          '12월 8~14일',
          '12월 15~21일',
          '12월 22~28일',
          '12월 29일~1월 4일',
          '1월 5~11일',
          '1월 12~18일',
          '이번주',
        ]),
        mainY: createYData([460, 150, 280, 280, 620, 490, 280, 280]),
        subX: createXData([
          '12월 1~7일',
          '12월 8~14일',
          '12월 15~21일',
          '12월 22~28일',
          '12월 29일~1월 4일',
          '1월 5~11일',
          '1월 12~18일',
          '이번주',
        ]),
        subY: createYData([14, 18, 12, 20, 18, 18, 20, 12]),
      },
      color: 'var(--color-grey-400)',
    },
    SLS_11_07: {
      data: {
        mainX: createXData(['8월', '9월', '10월', '11월', '12월', '이번달']),
        mainY: createYData([540, 180, 310, 310, 310, 310]),
        subX: createXData(['8월', '9월', '10월', '11월', '12월', '이번달']),
        subY: createYData([18, 15, 24, 21, 24, 15]),
      },
      color: 'var(--color-grey-400)',
    },
  } as const,
};

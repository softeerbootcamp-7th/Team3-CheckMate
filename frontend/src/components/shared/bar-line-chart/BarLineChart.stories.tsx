import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, TooltipProvider } from '@/components/shared/shadcn-ui';
import type { BarLineChartSeries } from '@/types/shared';

import { BarLineChart } from './BarLineChart';

const BAR_LINE_WEEKLY_MOCK: BarLineChartSeries = {
  color: 'var(--color-grey-400)',
  data: {
    mainX: [
      { amount: '1월 15일', unit: '' },
      { amount: '1월 16일', unit: '' },
      { amount: '1월 17일', unit: '' },
      { amount: '1월 18일', unit: '' },
      { amount: '1월 19일', unit: '' },
      { amount: '1월 20일', unit: '' },
      { amount: '오늘', unit: '' },
    ],
    subX: [
      { amount: '1월 15일', unit: '' },
      { amount: '1월 16일', unit: '' },
      { amount: '1월 17일', unit: '' },
      { amount: '1월 18일', unit: '' },
      { amount: '1월 19일', unit: '' },
      { amount: '1월 20일', unit: '' },
      { amount: '오늘', unit: '' },
    ],
    mainY: [
      { amount: 17.4, unit: '만' },
      { amount: 10.2, unit: '만' },
      { amount: 13.5, unit: '만' },
      { amount: 15.8, unit: '만' },
      { amount: 18.7, unit: '만' },
      { amount: 15.6, unit: '만' },
      { amount: 11.1, unit: '만' },
    ],
    subY: [
      { amount: 10, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 9, unit: '건' },
      { amount: 13, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 13, unit: '건' },
      { amount: 9, unit: '건' },
    ],
  },
};

const BAR_LINE_MONTHLY_MOCK: BarLineChartSeries = {
  color: 'var(--color-grey-400)',
  data: {
    mainX: [
      { amount: '1/1', unit: '' },
      { amount: '1/2', unit: '' },
      { amount: '1/3', unit: '' },
      { amount: '1/4', unit: '' },
      { amount: '1/5', unit: '' },
      { amount: '1/6', unit: '' },
      { amount: '1/7', unit: '' },
      { amount: '1/8', unit: '' },
      { amount: '1/9', unit: '' },
      { amount: '1/10', unit: '' },
      { amount: '1/11', unit: '' },
      { amount: '1/12', unit: '' },
      { amount: '1/13', unit: '' },
      { amount: '1/14', unit: '' },
      { amount: '1/15', unit: '' },
      { amount: '1/16', unit: '' },
      { amount: '1/17', unit: '' },
      { amount: '1/18', unit: '' },
      { amount: '1/19', unit: '' },
      { amount: '1/20', unit: '' },
      { amount: '1/21', unit: '' },
      { amount: '1/22', unit: '' },
      { amount: '1/23', unit: '' },
      { amount: '1/24', unit: '' },
      { amount: '1/25', unit: '' },
      { amount: '1/26', unit: '' },
      { amount: '1/27', unit: '' },
      { amount: '1/28', unit: '' },
      { amount: '1/29', unit: '' },
      { amount: '오늘', unit: '' },
    ],
    subX: [
      { amount: '1/1', unit: '' },
      { amount: '1/2', unit: '' },
      { amount: '1/3', unit: '' },
      { amount: '1/4', unit: '' },
      { amount: '1/5', unit: '' },
      { amount: '1/6', unit: '' },
      { amount: '1/7', unit: '' },
      { amount: '1/8', unit: '' },
      { amount: '1/9', unit: '' },
      { amount: '1/10', unit: '' },
      { amount: '1/11', unit: '' },
      { amount: '1/12', unit: '' },
      { amount: '1/13', unit: '' },
      { amount: '1/14', unit: '' },
      { amount: '1/15', unit: '' },
      { amount: '1/16', unit: '' },
      { amount: '1/17', unit: '' },
      { amount: '1/18', unit: '' },
      { amount: '1/19', unit: '' },
      { amount: '1/20', unit: '' },
      { amount: '1/21', unit: '' },
      { amount: '1/22', unit: '' },
      { amount: '1/23', unit: '' },
      { amount: '1/24', unit: '' },
      { amount: '1/25', unit: '' },
      { amount: '1/26', unit: '' },
      { amount: '1/27', unit: '' },
      { amount: '1/28', unit: '' },
      { amount: '1/29', unit: '' },
      { amount: '오늘', unit: '' },
    ],
    mainY: [
      { amount: 20.1, unit: '만' },
      { amount: 7.5, unit: '만' },
      { amount: 12.7, unit: '만' },
      { amount: 18.2, unit: '만' },
      { amount: 23.4, unit: '만' },
      { amount: 17.9, unit: '만' },
      { amount: 9.1, unit: '만' },
      { amount: 20.4, unit: '만' },
      { amount: 7.3, unit: '만' },
      { amount: 12.8, unit: '만' },
      { amount: 18.1, unit: '만' },
      { amount: 23.3, unit: '만' },
      { amount: 17.8, unit: '만' },
      { amount: 9.0, unit: '만' },
      { amount: 20.2, unit: '만' },
      { amount: 7.4, unit: '만' },
      { amount: 12.9, unit: '만' },
      { amount: 18.3, unit: '만' },
      { amount: 23.2, unit: '만' },
      { amount: 17.7, unit: '만' },
      { amount: 8.9, unit: '만' },
      { amount: 20.0, unit: '만' },
      { amount: 7.2, unit: '만' },
      { amount: 12.6, unit: '만' },
      { amount: 18.0, unit: '만' },
      { amount: 17.9, unit: '만' },
      { amount: 23.3, unit: '만' },
      { amount: 17.8, unit: '만' },
      { amount: 9.0, unit: '만' },
      { amount: 9.1, unit: '만' },
    ],
    subY: [
      { amount: 10, unit: '건' },
      { amount: 9, unit: '건' },
      { amount: 13, unit: '건' },
      { amount: 13, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 11, unit: '건' },
      { amount: 11, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 12, unit: '건' },
      { amount: 9, unit: '건' },
      { amount: 13, unit: '건' },
      { amount: 14, unit: '건' },
    ],
  },
};

const BAR_LINE_REALTIME_MOCK: BarLineChartSeries = {
  color: 'var(--color-grey-400)',
  data: {
    mainX: [
      { amount: '00:00', unit: '' },
      { amount: '02:00', unit: '' },
      { amount: '04:00', unit: '' },
      { amount: '06:00', unit: '' },
      { amount: '08:00', unit: '' },
      { amount: '10:00', unit: '' },
      { amount: '12:00', unit: '' },
      { amount: '14:00', unit: '' },
      { amount: '16:00', unit: '' },
      { amount: '18:00', unit: '' },
      { amount: '20:00', unit: '' },
      { amount: '22:00', unit: '' },
    ],
    subX: [
      { amount: '00:00', unit: '' },
      { amount: '02:00', unit: '' },
      { amount: '04:00', unit: '' },
      { amount: '06:00', unit: '' },
      { amount: '08:00', unit: '' },
      { amount: '10:00', unit: '' },
      { amount: '12:00', unit: '' },
      { amount: '14:00', unit: '' },
      { amount: '16:00', unit: '' },
      { amount: '18:00', unit: '' },
      { amount: '20:00', unit: '' },
      { amount: '22:00', unit: '' },
    ],
    mainY: [
      { amount: 6.2, unit: '만' },
      { amount: 8.1, unit: '만' },
      { amount: 7.4, unit: '만' },
      { amount: 10.3, unit: '만' },
      { amount: 9.6, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
      { amount: null, unit: '만' },
    ],
    subY: [
      { amount: 4, unit: '건' },
      { amount: 5, unit: '건' },
      { amount: 4, unit: '건' },
      { amount: 6, unit: '건' },
      { amount: 5, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
      { amount: null, unit: '건' },
    ],
  },
};

const meta = {
  title: 'components/shared/bar-line-chart/BarLineChart',
  component: BarLineChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof BarLineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const RealtimeBarLineChart = (args: Story['args']) => {
  const [barLineChartSeries, setBarLineChartSeries] =
    useState<BarLineChartSeries>(args.barLineChartSeries as BarLineChartSeries);

  const handleUpdateCurrentSeries = () => {
    let currentIndex =
      barLineChartSeries.data.mainY.filter((datum) => datum.amount !== null)
        .length - 1;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    setBarLineChartSeries((prev) => {
      const newMainY = [...prev.data.mainY];
      const newSubY = [...prev.data.subY];

      const currentMainYAmount = Number(newMainY[currentIndex]?.amount ?? 0);
      const currentSubYAmount = Number(newSubY[currentIndex]?.amount ?? 0);

      newMainY[currentIndex] = {
        ...newMainY[currentIndex],
        amount: +(currentMainYAmount + Math.random() * 2).toFixed(1),
        unit: '만',
      };

      newSubY[currentIndex] = {
        ...newSubY[currentIndex],
        amount: currentSubYAmount + Math.floor(Math.random() * 3 + 1),
        unit: '건',
      };

      return {
        ...prev,
        data: {
          ...prev.data,
          mainY: newMainY,
          subY: newSubY,
        },
      };
    });
  };

  const handleUpdateNextSeries = () => {
    const nextIndex = barLineChartSeries.data.mainY.filter(
      (datum) => datum.amount !== null,
    ).length;

    if (nextIndex >= barLineChartSeries.data.mainY.length) {
      return;
    }

    setBarLineChartSeries((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        mainY: [
          ...prev.data.mainY.slice(0, nextIndex),
          { amount: 0, unit: '만' },
          ...prev.data.mainY.slice(nextIndex + 1),
        ],
        subY: [
          ...prev.data.subY.slice(0, nextIndex),
          { amount: 0, unit: '건' },
          ...prev.data.subY.slice(nextIndex + 1),
        ],
      },
    }));
  };

  const handleReset = () => {
    setBarLineChartSeries({
      ...BAR_LINE_REALTIME_MOCK,
      data: {
        ...BAR_LINE_REALTIME_MOCK.data,
        mainY: BAR_LINE_REALTIME_MOCK.data.mainY.map((datum) => ({
          ...datum,
          amount: null,
        })),
        subY: BAR_LINE_REALTIME_MOCK.data.subY.map((datum) => ({
          ...datum,
          amount: null,
        })),
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <BarLineChart {...args} barLineChartSeries={barLineChartSeries} />
      </div>
      <Button
        onClick={handleUpdateCurrentSeries}
        variant="outline"
        size="sm"
        className="w-fit"
      >
        실시간 업데이트
      </Button>
      <Button
        onClick={handleUpdateNextSeries}
        variant="outline"
        size="sm"
        className="w-fit"
      >
        다음 시간대 업데이트
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        size="sm"
        className="w-fit"
      >
        초기화
      </Button>
    </div>
  );
};

export const Default: Story = {
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 300,
    yGuideLineCount: 5,
    xAxisType: 'default',
    chartTitle: 'BarLineChart',
    chartDescription: 'BarLineChart',
    hasXAxis: true,
    showXGuideLine: true,
    showYGuideLine: true,
    tooltipContent: (mainY, subY) => `${mainY}/${subY}`,
    barLineChartSeries: BAR_LINE_WEEKLY_MOCK,
  },
  render: (args) => (
    <TooltipProvider>
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <BarLineChart {...args} />
      </div>
    </TooltipProvider>
  ),
};

export const Monthly30Days: Story = {
  args: {
    viewBoxWidth: 2000,
    viewBoxHeight: 400,
    yGuideLineCount: 4,
    xAxisType: 'right-arrow',
    chartTitle: '일별 매출 추이',
    chartDescription: '최근 30일 실매출과 주문건수 데이터',
    hasXAxis: true,
    showXGuideLine: false,
    showYGuideLine: true,
    tooltipContent: (mainY, subY) => `${mainY}/${subY}`,
    barLineChartSeries: BAR_LINE_MONTHLY_MOCK,
  },
  render: (args) => (
    <TooltipProvider>
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <BarLineChart {...args} />
      </div>
    </TooltipProvider>
  ),
};

export const Realtime: Story = {
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 260,
    yGuideLineCount: 4,
    xAxisType: 'tick',
    chartTitle: '시간대별 실시간 매출/주문',
    chartDescription: '실시간으로 업데이트되는 바-라인 차트',
    hasXAxis: true,
    showXGuideLine: true,
    showYGuideLine: true,
    tooltipContent: (mainY, subY) => `${mainY}/${subY}`,
    barLineChartSeries: BAR_LINE_REALTIME_MOCK,
  },
  render: (args) => (
    <TooltipProvider>
      <RealtimeBarLineChart {...args} />
    </TooltipProvider>
  ),
};

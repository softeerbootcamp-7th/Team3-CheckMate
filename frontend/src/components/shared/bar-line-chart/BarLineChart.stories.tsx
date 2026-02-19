import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, TooltipProvider } from '@/components/shared/shadcn-ui';
import {
  BAR_LINE_MONTHLY_MOCK,
  BAR_LINE_REALTIME_MOCK,
  BAR_LINE_WEEKLY_MOCK,
} from '@/mocks/data';
import type { BarLineChartSeries } from '@/types/shared';

import { BarLineChart } from './BarLineChart';

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
    activeTooltip: true,
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
    activeTooltip: true,
    tooltipContent: (mainY, subY) => `${mainY}/${subY}`,
    barLineChartSeries: BAR_LINE_REALTIME_MOCK,
  },
  render: (args) => (
    <TooltipProvider>
      <RealtimeBarLineChart {...args} />
    </TooltipProvider>
  ),
};

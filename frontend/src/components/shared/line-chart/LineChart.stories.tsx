import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, TooltipProvider } from '@/components/shared/shadcn-ui';
import {
  PRIMARY_SERIES_MOCK,
  SECONDARY_SERIES_MOCK,
  WEEKLY_DATA,
} from '@/mocks/data';

import { LineChart } from './LineChart';

const meta = {
  title: 'components/shared/line-chart/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    viewBoxWidth: { control: 'number' },
    viewBoxHeight: { control: 'number' },
    hasXAxis: { control: 'boolean' },
    hasGradient: {
      control: 'boolean',
    },
    showXGuideLine: {
      control: 'boolean',
    },
    showYGuideLine: {
      control: 'boolean',
    },
    yGuideLineCount: {
      control: 'number',
    },
    primarySeries: {
      control: 'object',
    },
    secondarySeries: {
      control: 'object',
    },
    activeTooltip: {
      control: 'boolean',
    },
    tooltipContent: {
      disable: true,
    },
    chartTitle: {
      control: 'text',
    },
    chartDescription: {
      control: 'text',
    },
    xAxisType: {
      control: 'select',
      options: ['default', 'tick', 'right-arrow'],
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasGradient: false,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    primarySeries: WEEKLY_DATA,
    activeTooltip: false,
    tooltipContent: (mainY, subY) => `${mainY} (${subY})`,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow',
  },
  render: (args) => (
    <TooltipProvider>
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <LineChart {...args} />
      </div>
    </TooltipProvider>
  ),
};

const RealtimeLineChart = (args: Story['args']) => {
  const [primarySeries, setPrimarySeries] = useState(args.primarySeries);
  const [secondarySeries] = useState(args.secondarySeries);

  const handleUpdateCurrentPrimarySeries = () => {
    let currentIndex =
      primarySeries.data.mainY.filter((datum) => datum.amount !== null).length -
      1;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    setPrimarySeries((prev) => {
      const newMainY = [...prev.data.mainY];
      const newSubY = [...prev.data.subY];
      const currentAmount = newMainY[currentIndex].amount ?? 0;
      const currentSubY = newSubY[currentIndex]?.amount ?? 0;

      newMainY[currentIndex] = {
        ...newMainY[currentIndex],
        amount: +currentAmount + Math.floor(Math.random() * 10),
        unit: '건',
      };

      newSubY[currentIndex] = {
        ...newSubY[currentIndex],
        amount: +currentSubY + Math.floor(Math.random() * 10),
        unit: '만',
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

  const handleUpdateNextPrimarySeries = () => {
    const nextIndex = primarySeries.data.mainY.filter(
      (datum) => datum.amount !== null,
    ).length;

    if (nextIndex === primarySeries.data.mainY.length) {
      return;
    }

    setPrimarySeries((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        mainY: [
          ...prev.data.mainY.slice(0, nextIndex),
          { amount: 0, unit: '건' },
          ...prev.data.mainY.slice(nextIndex + 1),
        ],
        subY: [
          ...prev.data.subY.slice(0, nextIndex),
          { amount: 0, unit: '만' },
          ...prev.data.subY.slice(nextIndex + 1),
        ],
      },
    }));
  };

  const handleReset = () => {
    setPrimarySeries(PRIMARY_SERIES_MOCK);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <LineChart
          {...args}
          primarySeries={primarySeries}
          secondarySeries={secondarySeries}
        />
      </div>
      <Button
        onClick={handleUpdateCurrentPrimarySeries}
        variant="outline"
        size="sm"
        className="w-fit"
      >
        실시간 업데이트
      </Button>
      <Button
        onClick={handleUpdateNextPrimarySeries}
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

export const Realtime: Story = {
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    primarySeries: PRIMARY_SERIES_MOCK,
    secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => `${mainY} (${subY})`,
    yGuideLineCount: 4,
    xAxisType: 'tick',
  },
  render: (args) => (
    <TooltipProvider>
      <RealtimeLineChart {...args} />
    </TooltipProvider>
  ),
};

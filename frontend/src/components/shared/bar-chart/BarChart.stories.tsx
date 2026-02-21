import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  PRIMARY_SERIES_MOCK,
  SECONDARY_SERIES_MOCK,
  WEEKLY_DATA,
} from '@/mocks/data';
import { STACK_BAR, STACK_BAR_HOURLY } from '@/mocks/data/storybook/';
import type { BarChartSeries, StackBarChartSeries } from '@/types/shared';

import { Button, TooltipProvider } from '../shadcn-ui';

import { BarChart } from './BarChart';

const meta = {
  title: 'components/shared/bar-chart/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    viewBoxWidth: { control: 'number' },
    viewBoxHeight: { control: 'number' },
    hasXAxis: { control: 'boolean' },
    hasBarGradient: {
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
    // secondarySeries: {
    //   control: 'object',
    // },
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
  },
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    primarySeries: WEEKLY_DATA,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => `${mainY} (${subY})`,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow',
    activeDataIndex: 3,
    barColorChangeOnHover: true,
  },
  render: (args) => (
    <TooltipProvider>
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <BarChart {...args} />
      </div>
    </TooltipProvider>
  ),
};

export const StackBar: Story = {
  args: {
    viewBoxWidth: 1000,
    viewBoxHeight: 250,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    yGuideLineCount: 4,
    primarySeries: STACK_BAR,
    activeTooltip: true,
    chartTitle: '일별 매출 꺾은선 차트',
    chartDescription: '일별 매출 꺾은선 차트 설명',
    xAxisType: 'right-arrow',
    activeDataIndex: 3,
    barColorChangeOnHover: true,
  },
  render: (args) => (
    <TooltipProvider>
      <div
        style={{
          width: `${args.viewBoxWidth}px`,
          height: `${args.viewBoxHeight}px`,
        }}
      >
        <BarChart {...args} />
      </div>
    </TooltipProvider>
  ),
};

const RealtimeBarChart = (args: Story['args']) => {
  const [primarySeries, setBarChartSeries] = useState<BarChartSeries>(
    args.primarySeries as BarChartSeries,
  );

  const [activeDataIndex, setActiveDataIndex] = useState<number>(
    args.primarySeries.data.mainX.length - 1,
  );

  const handleUpdateCurrentBarChartSeries = () => {
    let currentIndex =
      primarySeries.data.mainY.filter((datum) => datum.amount !== null).length -
      1;

    if (currentIndex < 0) {
      currentIndex = 0;
    }

    setActiveDataIndex(currentIndex);

    setBarChartSeries((prev) => {
      const newMainY = [...prev.data.mainY];
      //const newSubY = [...prev.data.subY];
      const currentAmount = newMainY[currentIndex].amount ?? 0;
      //const currentSubY = newSubY[currentIndex]?.amount ?? 0;

      newMainY[currentIndex] = {
        ...newMainY[currentIndex],
        amount: +currentAmount + Math.floor(Math.random() * 10),
        unit: '건',
      };

      // newSubY[currentIndex] = {
      //   ...newSubY[currentIndex],
      //   amount: +currentSubY + Math.floor(Math.random() * 10),
      //   unit: '만',
      // };

      return {
        ...prev,
        data: {
          ...prev.data,
          mainY: newMainY,
          //subY: newSubY,
        },
      };
    });
  };

  const handleUpdateNextBarChartSeries = () => {
    const nextIndex = primarySeries.data.mainY.filter(
      (datum) => datum.amount !== null,
    ).length;

    // if (nextIndex === primarySeries.data.mainY.length) {
    //   return;
    // }

    setActiveDataIndex(nextIndex);

    setBarChartSeries((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        mainX: [
          ...prev.data.mainX.slice(0, nextIndex),
          { amount: `${nextIndex * 2}:00`, unit: '' },
          ...prev.data.mainX.slice(nextIndex + 1),
        ],
        mainY: [
          ...prev.data.mainY.slice(0, nextIndex),
          { amount: 0, unit: '건' },
          ...prev.data.mainY.slice(nextIndex + 1),
        ],
        // subY: [
        //   ...prev.data.subY.slice(0, nextIndex),
        //   { amount: 0, unit: '만' },
        //   ...prev.data.subY.slice(nextIndex + 1),
        // ],
      },
    }));
  };

  const handleReset = () => {
    setBarChartSeries(PRIMARY_SERIES_MOCK);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5">
        <div
          style={{
            width: `${args.viewBoxWidth}px`,
            height: `${args.viewBoxHeight}px`,
          }}
        >
          <BarChart
            {...args}
            primarySeries={primarySeries}
            activeDataIndex={activeDataIndex}
            //secondarySeries={secondarySeries}
          />
        </div>
        <Button
          onClick={handleUpdateCurrentBarChartSeries}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          실시간 업데이트
        </Button>
        <Button
          onClick={handleUpdateNextBarChartSeries}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          다음 시간 축 추가
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
    </TooltipProvider>
  );
};
const RealtimeStackBarChart = (args: Story['args']) => {
  const [primarySeries, setBarChartSeries] = useState<StackBarChartSeries>(
    args.primarySeries as StackBarChartSeries,
  );

  const handleUpdateCurrentBarChartSeries = () => {
    const currentIndex =
      primarySeries.data.mainY.filter((stack) => stack && stack.length > 0)
        .length - 1;

    const safeIndex = Math.max(0, currentIndex);

    setBarChartSeries((prev) => {
      const newMainY = [...prev.data.mainY];

      // 아직 활성화된 스택이 없으면 0번째를 초기화해버림
      if (!newMainY[safeIndex] || newMainY[safeIndex].length === 0) {
        newMainY[safeIndex] = [];
      }

      // 예시: 스택 조각 중 하나를 랜덤으로 증가
      const stack = newMainY[safeIndex].map((item) => ({ ...item }));
      const pick = Math.floor(Math.random() * stack.length); // 스택 조각 중 랜덤 선택

      const curAmount = Number(stack[pick].amount ?? 0);
      stack[pick].amount = curAmount + Math.floor(Math.random() * 10); // 랜덤 증가
      stack[pick].unit = '건';

      newMainY[safeIndex] = stack;

      return {
        ...prev,
        data: {
          ...prev.data,
          mainY: newMainY,
        },
      };
    });
  };

  const handleUpdateNextBarChartSeries = () => {
    const nextIndex = primarySeries.data.mainY.filter(
      (stack) => stack && stack.length > 0,
    ).length;

    // if (nextIndex === primarySeries.data.mainY.length) {
    //   return;
    // }

    setBarChartSeries((prev) => ({
      ...prev,
      data: {
        ...prev.data,

        mainX: [
          ...prev.data.mainX.slice(0, nextIndex),
          { amount: `${nextIndex * 2}:00`, unit: '' },
          ...prev.data.mainX.slice(nextIndex + 1),
        ],
        mainY: [
          ...prev.data.mainY.slice(0, nextIndex),
          [{ amount: 45, unit: '건', label: '아메리카노' }],
          ...prev.data.mainY.slice(nextIndex + 1),
        ],
        // subY: [
        //   ...prev.data.subY.slice(0, nextIndex),
        //   { amount: 0, unit: '만' },
        //   ...prev.data.subY.slice(nextIndex + 1),
        // ],
      },
    }));
  };

  const handleReset = () => {
    setBarChartSeries(STACK_BAR_HOURLY);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-5">
        <div
          style={{
            width: `${args.viewBoxWidth}px`,
            height: `${args.viewBoxHeight}px`,
          }}
        >
          <BarChart
            {...args}
            primarySeries={primarySeries}
            //secondarySeries={secondarySeries}
          />
        </div>
        <Button
          onClick={handleUpdateCurrentBarChartSeries}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          실시간 업데이트
        </Button>
        <Button
          onClick={handleUpdateNextBarChartSeries}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          다음 시간 축 추가
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
    </TooltipProvider>
  );
};
export const Realtime: Story = {
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 156,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    primarySeries: SECONDARY_SERIES_MOCK,
    //secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    tooltipContent: (mainY, subY) => `${mainY} (${subY})`,
    yGuideLineCount: 4,
    xAxisType: 'right-arrow',
  },
  render: (args) => <RealtimeBarChart {...args} />,
};

export const RealtimeStackBar: Story = {
  args: {
    viewBoxWidth: 1020,
    viewBoxHeight: 300,
    hasXAxis: true,
    hasBarGradient: true,
    showXGuideLine: true,
    showYGuideLine: true,
    primarySeries: STACK_BAR_HOURLY,
    //secondarySeries: SECONDARY_SERIES_MOCK,
    activeTooltip: true,
    yGuideLineCount: 4,
    xAxisType: 'right-arrow',
  },
  render: (args) => <RealtimeStackBarChart {...args} />,
};

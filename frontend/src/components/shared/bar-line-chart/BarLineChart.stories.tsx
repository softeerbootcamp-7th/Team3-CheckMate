import type { Meta, StoryObj } from '@storybook/react-vite';

import { TooltipProvider } from '@/components/shared/shadcn-ui';
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

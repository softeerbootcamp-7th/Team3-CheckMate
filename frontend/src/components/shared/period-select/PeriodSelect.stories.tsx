import type { Meta, StoryObj } from '@storybook/react-vite';

import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { PeriodSelect } from './PeriodSelect';

const meta = {
  title: 'components/shared/period-select/PeriodSelect',
  component: PeriodSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    periodPreset: {
      control: 'select',
      options: Object.values(PERIOD_PRESET_KEYS),
      defaultValue: PERIOD_PRESET_KEYS.dayWeekMonth,
      description:
        '오늘-이번주-이번달 그룹 또는 최근 7일, 최근 14일, 최근 30일 미리 정의된 그룹 중에서 선택',
    },
    periodType: {
      control: 'select',
      options: [
        'today',
        'thisWeek',
        'thisMonth',
        'recent7Days',
        'recent14Days',
        'recent30Days',
        'recent8Weeks',
        'recent12Weeks',
        'recent6Months',
        'recent12Months',
        'recent3Years',
        'today',
      ],
      disabled: true,
    },
  },
} satisfies Meta<typeof PeriodSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    periodPreset: 'dayWeekMonth',
    periodType: undefined,
    setPeriodType: () => {},
    setStartDate: () => {},
    setEndDate: () => {},
  },
};

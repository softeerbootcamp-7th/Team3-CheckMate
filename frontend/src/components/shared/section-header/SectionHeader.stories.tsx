import type { Meta, StoryObj } from '@storybook/react-vite';

import { PERIOD_PRESET_KEYS } from '@/constants/shared';

import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'components/shared/section-header/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    title: {
      control: 'text',
      defaultValue: '섹션 제목',
    },
    description: {
      control: 'text',
      defaultValue: '섹션에 대한 설명이 들어가는 자리입니다.',
    },
    lastUpdatedDate: {
      control: 'date',
      defaultValue: new Date(),
    },
    onRefresh: {
      action: '새로고침 버튼이 클릭되었습니다!',
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    periodSelectProps: {
      control: 'object',
      defaultValue: {
        periodPreset: PERIOD_PRESET_KEYS.dayWeekMonth,
        periodType: undefined,
        startDate: undefined,
        endDate: undefined,
        setPeriodType: () => {},
        setStartDate: () => {},
        setEndDate: () => {},
      },
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.',
    lastUpdatedDate: new Date(),
    onRefresh: () => alert('새로고침 버튼이 클릭되었습니다!'),
    isLoading: false,
    periodSelectProps: {
      periodPreset: 'dayWeekMonth',
      periodType: undefined,
      setPeriodType: () => {},
      setStartDate: () => {},
      setEndDate: () => {},
    },
  },
};

export const WithoutPeriodSelect: Story = {
  args: {
    title: '섹션 제목',
    description: '섹션에 대한 설명이 들어가는 자리입니다.',
    lastUpdatedDate: new Date(),
    onRefresh: () => alert('새로고침 버튼이 클릭되었습니다!'),
    isLoading: false,
  },
};
